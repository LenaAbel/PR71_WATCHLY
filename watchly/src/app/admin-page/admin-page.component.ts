import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ShowsService } from '../services/shows.service';
import { Content } from '../models/content';

@Component({
  selector: 'app-admin-page',
  templateUrl: './admin-page.component.html',
  styleUrls: ['./admin-page.component.css']
})
export class AdminPageComponent implements OnInit {
  isAdmin: boolean = false;
  content: Content[] = [];
  displayedMovies: any[] = [];
  displayedSeries: any[] = [];
  nonDisplayedMovies: any[] = [];
  nonDisplayedSeries: any[] = [];

  constructor(private router: Router, private showsService: ShowsService) {
    this.checkAdminStatus();
    if (!this.isAdmin) {
      this.redirectToHome();
    }
  }

  async ngOnInit(): Promise<void> {
    try {
      // Initialize content in the service
      await this.showsService.initializeContent();

      // Access the populated arrays after fetching
      this.displayedMovies = this.showsService.getDisplayedMovies();
      this.displayedSeries = this.showsService.getDisplayedSeries();
      this.nonDisplayedMovies = this.showsService.getNonDisplayedMovies();
      this.nonDisplayedSeries = this.showsService.getNonDisplayedSeries();
    } catch (error) {
      console.error('Error initializing admin page:', error);
    }
  }

  checkAdminStatus(): void {
    this.isAdmin = localStorage.getItem('isAdmin') === 'true';
  }


  deleteShow(movie: any): void {
    // put is_displayed to false in the api
  }

  redirectToHome(): void {
    this.router.navigate(['']);
  }

  addShow(movie: any): void {
    // put is_displayed to true in the api
  }
}