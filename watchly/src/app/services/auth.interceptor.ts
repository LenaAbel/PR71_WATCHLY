import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Router } from '@angular/router';
import { AuthenticationService } from './authentification.service';

@Injectable()
/**
 * AuthInterceptor intercepts HTTP requests and adds the Authorization header if a token is present.
 * It also handles 401 Unauthorized errors by redirecting to the login page.
 * @param router - Router service to navigate between pages.
 * @param authService - AuthenticationService to handle authentication-related tasks.
 */
export class AuthInterceptor implements HttpInterceptor {
  constructor(
    private router: Router,
    private authService: AuthenticationService
  ) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const token = localStorage.getItem('authToken'); 

    if (token) {
      req = req.clone({
        setHeaders: {
          Authorization: `Bearer ${token}`
        }
      });
    }

    return next.handle(req).pipe(
      catchError((error: HttpErrorResponse) => {
        if (error.status === 401) {
          this.authService.logout();
          this.router.navigate(['/login'], { 
            queryParams: { message: 'Your session has expired. Please login again.' } 
          });
        }
        return throwError(() => error);
      })
    );
  }
}
