import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ShowsService } from '../services/shows.service';
import { Content } from '../models/content';

@Component({
  selector: 'app-admin-page',
  templateUrl: './admin-page.component.html',
  styleUrls: ['./admin-page.component.css']
})

/**
 * AdminPageComponent is responsible for managing the admin page.
 * @param isAdmin - Indicates if the user is an admin.
 * @param content - Array of Content objects representing all shows.
 * @param displayedMovies - Array of Content objects representing movies that are currently displayed.
 * @param displayedSeries - Array of Content objects representing series that are currently displayed.
 * @param nonDisplayedMovies - Array of Content objects representing movies that are not displayed.
 * @param nonDisplayedSeries - Array of Content objects representing series that are not displayed.
 * @param showsService - Service to manage shows data.
 * @param router - Router service to navigate between pages.
 */
export class AdminPageComponent implements OnInit {
  isAdmin: boolean = false;
  content: Content[] = [];
  displayedMovies: Content[] = [];
  displayedSeries: Content[] = [];
  nonDisplayedMovies: Content[] = [];
  nonDisplayedSeries: Content[] = [];

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