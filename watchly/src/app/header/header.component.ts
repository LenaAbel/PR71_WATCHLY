import { Component, Input, OnInit, OnChanges } from '@angular/core';
import { Router } from '@angular/router';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  @Input() route!: string;
  searchQuery: string = '';

  token: string | null = null;

  constructor(private router: Router) {}
  ngOnChanges(): void {
    this.token = localStorage.getItem('authToken');
    console.log(this.token);
    this.route = this.router.url.split('/')[1]; // e.g. "login", "register"
  }
  ngOnInit(): void {
    this.token = localStorage.getItem('authToken');
    console.log(this.token);

    this.route = this.router.url.split('/')[1]; // e.g. "login", "register"
  }

  goToResearch() {
    this.router.navigate(['/research'], { queryParams: { q: this.searchQuery } });
  }
}
