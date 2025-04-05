import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, tap, throwError } from 'rxjs';

interface LoginResponse {
  token: string;
  user: {
    username: string;
    firstname: string;
    lastname: string;
    email: string;
  };
}

interface ProfilePicture {
  picture_id: number;
  link: string;
  type: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  private apiUrl = 'http://localhost:3000/api/users';

  constructor(private http: HttpClient) {}

  register(user: any): Observable<any> {
    // Clear any existing cached data
    localStorage.clear();
    sessionStorage.clear();
    
    return this.http.post(`${this.apiUrl}/register`, user).pipe(
      tap(() => {
        // Clear browser cache for profile pictures
        if (window.caches) {
          caches.keys().then(names => {
            names.forEach(name => {
              caches.delete(name);
            });
          });
        }
      })
    );
  }

  login(credentials: any): Observable<{ token: string; user?: any }> {
    // Clear any existing cached data
    localStorage.clear();
    sessionStorage.clear();
    if (window.caches) {
      caches.keys().then(names => {
        names.forEach(name => {
          caches.delete(name);
        });
      });
    }

    return this.http.post<{ token: string; user?: any }>(`${this.apiUrl}/login`, credentials)
      .pipe(
            tap(response => {
                if (response.token) {
                    localStorage.setItem('authToken', response.token);
                } else {
                    console.error("Token not found in response");
                }
                if (response.user.is_admin !== undefined){
                    localStorage.setItem('userData', JSON.stringify(response.user));
                    localStorage.setItem('isAdmin', response.user.is_admin);
                    console.log('isAdmin stored:', response.user.is_admin);
                }
            })
        );
  }

  saveToken(token: string): void {
    localStorage.setItem('authToken', token);
  }

  getToken(): string | null {
    return localStorage.getItem('authToken');
  }

  // Check if the user is logged in
  isLoggedIn(): boolean {
    return !!this.getToken();
  }

  // Log out the user
  logout(): void {
    localStorage.clear();
    sessionStorage.clear();
    if (window.caches) {
      caches.keys().then(names => {
        names.forEach(name => {
          caches.delete(name);
        });
      });
    }
  }

  updateUserProfile(userData: any): Observable<any> {
    const token = this.getToken();
    if (!token) {
      return throwError(() => new Error('No authentication token'));
    }
    return this.http.put(`${this.apiUrl}/profile`, userData, {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    });
  }

  getDefaultProfilePictures(): Observable<ProfilePicture[]> {
    return this.http.get<ProfilePicture[]>(`${this.apiUrl}/profile-pictures`);
  }

  getUserPicture(userId: number): Observable<{ profile_picture: string }> {
    return this.http.get<{ profile_picture: string }>(`${this.apiUrl}/${userId}/picture`);
  }

  deleteAccount(): Observable<any> {
    const token = this.getToken();
    const userData = localStorage.getItem('userData');
    if (!token || !userData) {
      return throwError(() => new Error('No authentication token or user data'));
    }
    const userId = JSON.parse(userData).id;
    return this.http.delete(`${this.apiUrl}/${userId}`, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    }).pipe(
      tap(() => {
        this.logout();
      })
    );
  }
}
