import { Component, Input, OnInit, OnChanges } from '@angular/core';
import { Router } from '@angular/router';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  @Input() route!: string;

  token: string | null = null;
  isAdmin: boolean = false;

  constructor(private router: Router) {}
  ngOnChanges(): void {
    this.token = localStorage.getItem('authToken');
    console.log(this.token);
    this.route = this.router.url.split('/')[1]; // e.g. "login", "register"
    this.isAdmin = localStorage.getItem('isAdmin') === 'true';
  }
  ngOnInit(): void {
    this.token = localStorage.getItem('authToken');
    console.log(this.token);
    this.isAdmin = localStorage.getItem('isAdmin') === 'true';

    this.route = this.router.url.split('/')[1]; // e.g. "login", "register"
  }
}
