import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
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

  // Change the constructor parameter from private to public
  constructor(private router: Router, public showsService: ShowsService) { }

  async ngOnInit(): Promise<void> {
    this.checkAdminStatus();
    await this.loadContent();
  }

  checkAdminStatus(): void {
    const userData = localStorage.getItem('userData');
    if (userData) {
      const user = JSON.parse(userData);
      this.isAdmin = user.is_admin === true;
      if (!this.isAdmin) {
        this.redirectToHome();
      }
    } else {
      this.redirectToHome();
    }
  }

  async addShow(show: Content): Promise<void> {
    try {
      await this.showsService.updateShowDisplayStatus(show.show_id, true);
      await this.loadContent();
    } catch (error) {
      console.error('Error adding show:', error);
    }
  }

  async showShow(show: Content): Promise<void> {
    try {
      await this.showsService.updateShowDisplayStatus(show.show_id, true);
      await this.loadContent();
    } catch (error) {
      console.error('Error showing show:', error);
    }
  }

  async deleteShow(show: Content): Promise<void> {
    try {
      await this.showsService.updateShowDisplayStatus(show.show_id, false);
      await this.loadContent();
    } catch (error) {
      console.error('Error deleting show:', error);
    }
  }

  async loadContent(): Promise<void> {
    try {
      // Reinitialize content
      await this.showsService.initializeContent();
      await this.refreshLists();
    } catch (error) {
      console.error('Error loading content:', error);
    }
  }

  private async refreshLists(): Promise<void> {
    this.displayedMovies = this.showsService.getDisplayedMovies();
    this.displayedSeries = this.showsService.getDisplayedSeries();
    this.nonDisplayedMovies = this.showsService.getNonDisplayedMovies();
    this.nonDisplayedSeries = this.showsService.getNonDisplayedSeries();
  }

  redirectToHome(): void {
    this.router.navigate(['']);
  }
}