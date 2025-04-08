import { Component, OnInit, ViewChild } from '@angular/core';
import { SwiperComponent } from 'swiper/angular';
import { HttpClient } from '@angular/common/http';
import { Content } from '../models/content';
import { Swiper } from 'swiper';
import { Utils } from '../utils';
import { Router } from '@angular/router';
import { trigger, state, style, animate, transition } from '@angular/animations';

@Component({
  selector: 'app-discover-page',
  templateUrl: './discover-page.component.html',
  styleUrls: ['./discover-page.component.css'],
  animations: [
    trigger('fadeIn', [
      state('void', style({ opacity: 0 })),
      transition(':enter', [
        animate('0.5s ease-in', style({ opacity: 1 }))
      ])
    ]),
    trigger('slideIn', [
      state('void', style({ transform: 'translateY(30px)', opacity: 0 })),
      transition(':enter', [
        animate('0.6s ease-out', style({ transform: 'translateY(0)', opacity: 1 }))
      ])
    ]),
    trigger('staggerIn', [
      transition('* => *', [
        style({ opacity: 0, transform: 'translateX(-20px)' }),
        animate('0.5s ease', style({ opacity: 1, transform: 'translateX(0)' }))
      ])
    ])
  ]
})
/**
 * Component to display the discover page with movies and series.
 * @param seriesSwiper - Swiper component for series.
 * @param moviesSwiper - Swiper component for movies.
 * @param displayedShows - Array of Content objects representing the displayed shows.
 * @param displayedMovies - Array of Content objects representing the displayed movies.
 * @param userFavoritesSeries - Array of favorite series IDs for the user.
 * @param userFavoritesMovies - Array of favorite movies IDs for the user.
 * @param userId - ID of the user.
 * @param swiperRef - Reference to the Swiper instance.
 * @param http - HttpClient service to make HTTP requests.
 * @param router - Router service to navigate between pages.
 */
export class DiscoverPageComponent implements OnInit {

  @ViewChild('seriesSwiper', { static: false }) seriesSwiper?: SwiperComponent;
  @ViewChild('moviesSwiper', { static: false }) moviesSwiper?: SwiperComponent;

  displayedShows: Content[] = [];
  displayedMovies: Content[] = [];
  userFavoritesSeries: number[] = [];
  userFavoritesMovies: number[] = [];
  userId: number = JSON.parse(localStorage.getItem('userData') || '{}').id;

  swiperRef: Swiper | undefined;

  constructor(private http: HttpClient, private router :Router) {}

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
        Utils.redirection404(this.router);
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
        Utils.redirection404(this.router);
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
