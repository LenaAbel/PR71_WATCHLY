import { Component, OnInit } from '@angular/core';
import { Content } from '../models/content';
import { ShowsService } from '../services/shows.service';

@Component({
  selector: 'app-your-shows-section',
  templateUrl: './your-shows-section.component.html',
  styleUrls: ['./your-shows-section.component.css']
})
export class YourShowsSectionComponent implements OnInit {
  selectedTab: string = 'movies'; 
  movies: Content[] = [];
  series: Content[] = [];
  content: Content[] = [];
  isLoggedIn: boolean = false;
  isAdmin: boolean = false;

  constructor(private showsService: ShowsService) {}

  async ngOnInit(): Promise<void> {
    this.checkAuthAndLoadContent();
  }

  checkAuthAndLoadContent(): void {
    // Check if user is logged in
    const token = localStorage.getItem('authToken');
    this.isLoggedIn = !!token;
    
    if (this.isLoggedIn) {
      // Check if user is admin
      const userData = localStorage.getItem('userData');
      if (userData) {
        const user = JSON.parse(userData);
        this.isAdmin = user.is_admin === true;
      }
      
      // Only load content for non-admin users
      if (!this.isAdmin) {
        this.loadContent();
      }
    }
  }

  loadContent(): void {
    // This should be implemented to load content based on selectedTab
    // For now, just setting empty arrays
    if (this.selectedTab === 'movies') {
      this.content = this.movies;
    } else {
      this.content = this.series;
    }
  }

  selectTab(tab: string): void {
    this.selectedTab = tab;
    if (this.isLoggedIn && !this.isAdmin) {
      this.loadContent();
    }
  }

  isSelected(tab: string): boolean {
    return this.selectedTab === tab;
  }

  hasContent(): boolean {
    return this.isLoggedIn && this.content && this.content.length > 0;
  }

  slideLeft(): void {
    const slider = document.querySelector('.slider-container') as HTMLElement;
    if (slider) {
      const scrollAmount = slider.clientWidth * 0.8; // Scroll by 80% of container width
      slider.scrollBy({
        left: -scrollAmount,
        behavior: 'smooth'
      });
    }
  }

  slideRight(): void {
    const slider = document.querySelector('.slider-container') as HTMLElement;
    if (slider) {
      const scrollAmount = slider.clientWidth * 0.8; // Scroll by 80% of container width
      slider.scrollBy({
        left: scrollAmount,
        behavior: 'smooth'
      });
    }
  }
}
