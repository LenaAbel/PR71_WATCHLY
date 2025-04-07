import { Component, Input, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { AuthenticationService } from '../services/authentification.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
/**
 * HeaderComponent is responsible for displaying the header of the application.
 * It includes navigation links, search functionality, and user authentication status.
 * 
 * @param route - The current route of the application.
 * @param searchQuery - The query string for searching shows.
 * @param token - The authentication token for the user.
 * @param isAdmin - Indicates if the user is an admin.
 * @param username - The username of the logged-in user.
 * @param profilePicture - The URL of the user's profile picture.
 */
export class HeaderComponent implements OnInit, OnChanges {
  @Input() route!: string;
  searchQuery: string = '';
  token: string | null = null;
  isAdmin: boolean = false;
  username: string = '';
  profilePicture: string = 'assets/img/default-person.jpg';

  constructor(
    private router: Router,
    private authService: AuthenticationService
  ) {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['route']) {
      // When the route input changes, re-check auth status
      this.checkAuthStatus();
    }
  }

  ngOnInit(): void {
    // Initial auth check
    this.checkAuthStatus();

    // Subscribe to auth state changes
    this.authService.authState.subscribe(() => {
      this.checkAuthStatus();
    });

    // Subscribe to route changes
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.route = this.router.url.split('/')[1];
        this.checkAuthStatus();
      }
    });
  }

  private checkAuthStatus(): void {
    // Fetch the token and user data from localStorage
    this.token = localStorage.getItem('authToken');
    const userData = localStorage.getItem('userData');

    if (this.token && userData) {
      const user = JSON.parse(userData);
      this.username = user.username;
      this.profilePicture = user.profile_picture || 'assets/img/default-person.jpg';
      this.isAdmin = user.is_admin === true;

      // Redirect to home if on login/register page and logged in
      if (this.route === 'login' || this.route === 'register') {
        this.router.navigate(['/']);
      }
    } else {
      // Clear state if no token or user data is found
      this.token = null;
      this.username = '';
      this.profilePicture = 'assets/img/default-person.jpg';
      this.isAdmin = false;
    }
  }
  
  goToResearch() {
    if (this.searchQuery.trim()) {
      this.router.navigate(['/research'], { queryParams: { q: this.searchQuery } });
    }
  }

  // Added login handler. Only navigates to login if no token exists.
  goToLogin() {
    if (!this.token) {
      this.router.navigate(['/login']);
    }
  }
}
