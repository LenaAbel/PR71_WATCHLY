import { Component, OnInit, ViewChild } from '@angular/core';
import { Content } from '../models/content';
import { ShowsService } from '../services/shows.service';
import { HttpClient } from '@angular/common/http';
import { SwiperComponent } from 'swiper/angular';
import Swiper from 'swiper';

@Component({
  selector: 'app-your-shows-section',
  templateUrl: './your-shows-section.component.html',
  styleUrls: ['./your-shows-section.component.css']
})
export class YourShowsSectionComponent implements OnInit {
  @ViewChild(SwiperComponent, { static: false }) swiper?: SwiperComponent;
  selectedTab: string = 'movies'; 
  allShows: Content[] = [];
  content: Content[] = [];
  isLoggedIn: boolean = false;
  isAdmin: boolean = false;
  swiperRef: Swiper | undefined;
  favoriteSuccessMessage: string | null = null;

  constructor(private showsService: ShowsService, private http: HttpClient) {}

  ngOnInit(): void {
    this.checkAuthAndLoadContent();
  }

  checkAuthAndLoadContent(): void {
    // Check if user is logged in
    const userData = localStorage.getItem('userData');
    this.isLoggedIn = !!userData;
    
    if (this.isLoggedIn && userData) {
      const user = JSON.parse(userData);
      this.isAdmin = user.is_admin === true;
      
      // Only load content for non-admin users
      if (!this.isAdmin) {
        this.getPerson(user.id);
      }
    }
  }

  getPerson(id: number) {
    const endpoint = `http://localhost:3000/api/persons/id/${id}`;
    this.http.get<{ shows: Content[] }>(endpoint).subscribe({
      next: (data) => {
        // Ensure is_movie is a proper boolean
        this.allShows = data.shows.map(show => ({
          ...show,
          is_movie: Boolean(show.is_movie) // Ensure proper boolean conversion
        }));
        
        this.filterShows();
        
        console.log('All shows:', this.allShows);
        console.log('Movies count:', this.allShows.filter(s => s.is_movie).length);
        console.log('Series count:', this.allShows.filter(s => !s.is_movie).length);
      },
      error: (err) => {
        console.error(`Error fetching person with id ${id}:`, err);
        this.allShows = [];
        this.content = [];
      }
    });
  }

  filterShows() {
    // Filter based on the selected tab
    if (this.selectedTab === 'movies') {
      this.content = this.allShows.filter(show => Boolean(show.is_movie) === true);
    } else {
      this.content = this.allShows.filter(show => Boolean(show.is_movie) === false);
    }
    
    console.log(`Filter applied: ${this.selectedTab}, Results: ${this.content.length}`);
  }

  selectTab(tab: string): void {
    this.selectedTab = tab;
    if (this.isLoggedIn && !this.isAdmin) {
      this.filterShows();
    }
  }

  isSelected(tab: string): boolean {
    return this.selectedTab === tab;
  }

  hasContent(): boolean {
    return this.isLoggedIn && this.content && this.content.length > 0;
  }

  onSwiper(swiper: Swiper) {
    this.swiperRef = swiper;
  }

  slideNext() {
    this.swiper?.swiperRef.slideNext();
  }

  slidePrev() {
    this.swiper?.swiperRef.slidePrev();
  }

  // Handle favorite deletion alert
  handleFavoriteDeleted(showName: string) {
    this.favoriteSuccessMessage = `"${showName}" removed from favorites`;
    
    // Refresh the favorites list
    const userData = localStorage.getItem('userData');
    if (userData) {
      const user = JSON.parse(userData);
      this.getPerson(user.id);
    }
    
    // Auto-hide the message after 3 seconds
    setTimeout(() => {
      this.favoriteSuccessMessage = null;
    }, 3000);
  }
}
