import { Component, Input, OnInit, OnChanges } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../user';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  @Input() route!: string;
  searchQuery: string = '';

  token: string | null = null;
  isAdmin: boolean = false;
  username: string = 'User';
  profilePicture: string = 'assets/img/default-person.jpg';

  constructor(private router: Router) {}
  ngOnChanges(): void {
    this.token = localStorage.getItem('authToken');
    console.log(this.token);
    if (this.token) {
      const userData = localStorage.getItem('userData');
      try {
        if (userData) {
          const user: User = JSON.parse(userData);
          this.username = user.username;
        }
      } catch (error) {
        console.error('Error parsing userData:', error);
      }
    }
    this.route = this.router.url.split('/')[1]; // e.g. "login", "register"
  }
  ngOnInit(): void {
    this.token = localStorage.getItem('authToken');
    if (this.token) {
      const userData = localStorage.getItem('userData');
      try {
        if (userData) {
          const user = JSON.parse(userData);
          this.username = user.username;
          // Always use the stored profile picture path
          this.profilePicture = user.profile_picture;
        }
      } catch (error) {
        console.error('Error parsing userData:', error);
        // Fallback to default picture if there's an error
        this.profilePicture = 'assets/img/default-person.jpg';
      }
    }
    this.isAdmin = localStorage.getItem('isAdmin') === 'true';
    this.route = this.router.url.split('/')[1];
  }

  goToResearch() {
    this.router.navigate(['/research'], { queryParams: { q: this.searchQuery } });
  }
}
