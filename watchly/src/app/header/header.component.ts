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
  username: string = 'User';  // Default value

  constructor(private router: Router) {}
  ngOnChanges(): void {
    this.token = localStorage.getItem('authToken');
    if (this.token) {
      const userData = localStorage.getItem('userData');
      console.log('userData in ngOnChanges:', userData);
      try {
        if (userData) {
          const user: User = JSON.parse(userData);
          this.username = user.username || 'User';
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
      console.log('userData in ngOnInit:', userData);
      try {
        if (userData) {
          const user: User = JSON.parse(userData);
          this.username = user.username || 'User';
        }
      } catch (error) {
        console.error('Error parsing userData:', error);
      }
    }
    this.route = this.router.url.split('/')[1]; // e.g. "login", "register"
  }

  goToResearch() {
    this.router.navigate(['/research'], { queryParams: { q: this.searchQuery } });
  }
}
