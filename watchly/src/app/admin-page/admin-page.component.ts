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
      await this.showsService.initializeContent();

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

  async addShow(show: Content): Promise<void> {
    try {
      await this.showsService.updateShowDisplayStatus(show, true);
      await this.refreshLists(); 
    } catch (error) {
      console.error('Error adding show:', error);
    }
  }

  async deleteShow(show: Content): Promise<void> {
    try {
      await this.showsService.updateShowDisplayStatus(show, false);
      await this.refreshLists(); 
    } catch (error) {
      console.error('Error deleting show:', error);
    }
  }

  private async refreshLists(): Promise<void> {
    this.displayedMovies = await this.showsService.getDisplayedMovies();
    this.displayedSeries = await this.showsService.getDisplayedSeries();
    this.nonDisplayedMovies = await this.showsService.getNonDisplayedMovies();
    this.nonDisplayedSeries = await this.showsService.getNonDisplayedSeries();
  }

  redirectToHome(): void {
    this.router.navigate(['']);
  }
}