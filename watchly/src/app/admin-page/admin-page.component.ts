import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin-page',
  templateUrl: './admin-page.component.html',
  styleUrls: ['./admin-page.component.css']
})
export class AdminPageComponent implements OnInit {
  isAdmin: boolean = false;
  displayedMovies: any[] = [];
  displayedSeries: any[] = [];
  nonDisplayedMovies: any[] = [];
  nonDisplayedSeries: any[] = [];

  constructor(private router: Router) {}

  ngOnInit(): void {
    this.checkAdminStatus();
    if (!this.isAdmin) {
      this.redirectToHome();
    }
    
    this.loadContent();
  }

  checkAdminStatus(): void {
    this.isAdmin = localStorage.getItem('isAdmin') === 'true';
  }

  loadContent(): void {
    // this.displayedMovies;
    // this.displayedSeries;
    // this.nonDisplayedMovies;
    // this.nonDisplayedSeries;
  }

  deleteShow(movie: any): void {
    // put is_displayed to false in the api
    this.loadContent();
  }

  redirectToHome(): void {
    this.router.navigate(['']);
  }


  addShow(movie: any): void {
    // put is_displayed to true in the api
    this.loadContent();
  }
}