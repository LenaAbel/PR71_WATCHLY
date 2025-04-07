import { Component, OnInit, ViewChild } from '@angular/core';
import { SwiperComponent } from 'swiper/angular';
import { HttpClient } from '@angular/common/http';
import { Content } from '../models/content';
import { Swiper } from 'swiper';

@Component({
  selector: 'app-discover-page',
  templateUrl: './discover-page.component.html',
  styleUrls: ['./discover-page.component.css']
})
export class DiscoverPageComponent implements OnInit {

  @ViewChild('seriesSwiper', { static: false }) seriesSwiper?: SwiperComponent;
  @ViewChild('moviesSwiper', { static: false }) moviesSwiper?: SwiperComponent;

  displayedShows: Content[] = [];
  displayedMovies: Content[] = [];
  userFavoritesSeries: number[] = [];
  userFavoritesMovies: number[] = [];
  userId: number = JSON.parse(localStorage.getItem('userData') || '{}').id;

  swiperRef: Swiper | undefined;

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.getDisplayedShows();
    this.getDisplayedMovies();
  }

  getDisplayedShows(): void {
    const endpoint = `http://localhost:3000/api/shows/tv/displayed`;
    this.http.get<Content[]>(endpoint).subscribe({
      next: (response) => {
        this.displayedShows = response;
        if (this.displayedShows.length > 0) {
          this.getUserFavorites(this.userId, 'series');
        }
      },
      error: (error) => {
        console.error('❌ Error fetching displayed shows:', error);
      }
    });
  }

  getDisplayedMovies(): void {
    const endpoint = `http://localhost:3000/api/shows/movies/displayed`;
    this.http.get<Content[]>(endpoint).subscribe({
      next: (response) => {
        this.displayedMovies = response;
        if (this.displayedMovies.length > 0) {
          this.getUserFavorites(this.userId, 'movies');
        }
      },
      error: (error) => {
        console.error('❌ Error fetching displayed movies:', error);
      }
    });
  }

  getUserFavorites(userId: number, type: 'movies' | 'series'): void {
    const endpoint = `http://localhost:3000/api/persons/id/${userId}/favorites`;
  
    this.http.get<any>(endpoint).subscribe({
      next: (response) => {
        const favoriteIds = response.favorites?.map((fav: { show_id: number }) => fav.show_id) || [];
  
        if (type === 'movies') {
          this.userFavoritesMovies = favoriteIds;
          this.markFavoriteMovies(response.favorites);
        } else {
          this.userFavoritesSeries = favoriteIds;
          this.markFavoriteSeries(response.favorites);
        }
      },
      error: (error) => {
        console.error(`❌ Error fetching ${type} favorites:`, error);
      }
    });
  }

  slideNext(type: 'series' | 'movies', event: Event): void {
    event.preventDefault();
    if (type === 'series') {
      this.seriesSwiper?.swiperRef.slideNext();
    } else {
      this.moviesSwiper?.swiperRef.slideNext();
    }
  }

  slidePrev(type: 'series' | 'movies', event: Event): void {
    event.preventDefault();
    if (type === 'series') {
      this.seriesSwiper?.swiperRef.slidePrev();
    } else {
      this.moviesSwiper?.swiperRef.slidePrev();
    }
  }

  onSwiper(swiper: Swiper) {
    this.swiperRef = swiper;
  }

  markFavoriteMovies(favorites: { show_id: number }[]): void {
    this.displayedMovies= this.displayedMovies.map(result => {
      const favorite = favorites.find(fav => fav.show_id === result.show_id);
  
      return {
        ...result,
        Favorite: favorite ? { ...favorite } : null
      };
    });
  
  }
  
  markFavoriteSeries(favorites: { show_id: number }[]): void {
    this.displayedShows= this.displayedShows.map(result => {
      const favorite = favorites.find(fav => fav.show_id === result.show_id);
  
      return {
        ...result,
        Favorite: favorite ? { ...favorite } : null
      };
    });
  
  }
  
}
