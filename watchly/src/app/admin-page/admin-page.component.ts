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
    this.loadContent();
  }

  checkAdminStatus(): void {
    // get the user from the api
    // if (!user || !user.isAdmin) {
    //   this.router.navigate(['/']);
    // } else {
    //   this.isAdmin = true;
    // }
    this.isAdmin= true;
  }

  loadContent(): void {
    this.displayedMovies;
    this.displayedSeries;
    this.nonDisplayedMovies;
    this.nonDisplayedSeries;
  }

  deleteShow(movie: any): void {
    // put is_displayed to false in the api
    this.loadContent();
  }


  addShow(movie: any): void {
    // put is_displayed to true in the api
    this.loadContent();
  }
}