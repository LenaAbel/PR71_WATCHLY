import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ShowGuard implements CanActivate {
  private apiUrl = 'http://localhost:3000/api';

  constructor(private http: HttpClient, private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
    const showId = route.paramMap.get('id');
    
    if (!showId) {
      this.router.navigate(['/error/404']);
      return of(false);
    }

    // Check if user is admin (admins can see all shows)
    const userData = localStorage.getItem('userData');
    if (userData) {
      const user = JSON.parse(userData);
      if (user.is_admin) {
        return of(true); // Admins bypass the check
      }
    }

    // For non-admins, check if the show exists and is set to be displayed
    return this.http.get<any>(`${this.apiUrl}/shows/display-status/${showId}`).pipe(
      map(response => {
        if (response && response.is_displayed) {
          return true;
        } else {
          this.router.navigate(['/error/404']);
          return false;
        }
      }),
      catchError(() => {
        this.router.navigate(['/error/404']);
        return of(false);
      })
    );
  }
}
