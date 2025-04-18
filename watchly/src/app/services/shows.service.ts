import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, BehaviorSubject, of, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

import { Content } from '../models/content';

@Injectable({
  providedIn: 'root'
})
/**
 * ShowsService handles operations related to movies and series.
 * It fetches, updates, and manages the display status of content.
 * @param apiURLMovie - The base URL for the movie API.
 * @param apiUrlTv - The base URL for the TV series API.
 * @param apiUrlPictures - The base URL for fetching pictures.
 * @param alertMessage - Message to display in the UI.
 * @param alertType - Type of alert (success or error).
 * @param alertTimeout - Timeout for auto-dismissing alerts.
 * @param movies - Array of movies.
 * @param series - Array of TV series.
 * @param notDisplayedMovies - Array of movies not displayed.
 * @param notDisplayedSeries - Array of TV series not displayed.
 * @param favoritesMovies - Array of favorite movies.
 * @param favoritesSeries - Array of favorite TV series.
 * @param displayedMoviesSubject - Subject to notify subscribers about displayed movies.
 * @param displayedSeriesSubject - Subject to notify subscribers about displayed series.
 * @param nonDisplayedMoviesSubject - Subject to notify subscribers about non-displayed movies.
 * @param nonDisplayedSeriesSubject - Subject to notify subscribers about non-displayed series.
 */
export class ShowsService {
  private apiURLMovie = 'http://localhost:3000/api/shows';
  private apiUrlTv = 'http://localhost:3000/api/episodes/details';
  private apiUrlPictures = 'http://localhost:3000/api/pictures';

  // Alert properties
  public alertMessage = '';
  public alertType: 'success' | 'error' | '' = '';
  private alertTimeout: any = null;

  public movies: Content[] = [];
  public series: Content[] = [];
  public notDisplayedMovies: Content[] = [];
  public notDisplayedSeries: Content[] = [];
  public favoritesMovies: Content[] = [];
  public favoritesSeries: Content[] = [];

  private displayedMoviesSubject = new BehaviorSubject<Content[]>([]);
  private displayedSeriesSubject = new BehaviorSubject<Content[]>([]);
  private nonDisplayedMoviesSubject = new BehaviorSubject<Content[]>([]);
  private nonDisplayedSeriesSubject = new BehaviorSubject<Content[]>([]);

  displayedMovies$ = this.displayedMoviesSubject.asObservable();
  displayedSeries$ = this.displayedSeriesSubject.asObservable();
  nonDisplayedMovies$ = this.nonDisplayedMoviesSubject.asObservable();
  nonDisplayedSeries$ = this.nonDisplayedSeriesSubject.asObservable();

  constructor(private http: HttpClient) { 
  }

  async ngOnInit() {
    await this.initializeContent();
  }

  public async initializeContent(): Promise<void> {
    try {
      await this.fetchMovies();
      await this.fetchSeries();
      this.updateSubjects();
    } catch (error) {
      console.error('Error initializing content:', error);
    }
  }

  private updateSubjects(): void {
    this.displayedMoviesSubject.next(this.movies);
    this.displayedSeriesSubject.next(this.series);
    this.nonDisplayedMoviesSubject.next(this.notDisplayedMovies);
    this.nonDisplayedSeriesSubject.next(this.notDisplayedSeries);
  }

  public fetchSeries(){
    return new Promise((resolve, reject) => {
      this.http.get<Content[]>(`${this.apiUrlTv}`).subscribe(
        async data => {
          this.series = data.filter(m => m.is_displayed=== true);
          this.notDisplayedSeries = data.filter(m => m.is_displayed === false);

          // Fetch thumbnails for each series : its not in the first call
          try {
            await Promise.all(
              this.series.map(async s => {
                s.thumbnail = (await this.fetchPoster(s.show_id).toPromise()) || 'assets/img/default-episode.jpg';
              })
            );
            await Promise.all(
              this.notDisplayedSeries.map(async s => {
                s.thumbnail = (await this.fetchPoster(s.show_id).toPromise()) || 'assets/img/default-episode.jpg';
              })
            );

            resolve(undefined);
          } catch (error) {
            console.error("Error fetching thumbnails:", error);
            reject(error);
          }
        },
        error => {
          console.error("Error fetching series:", error);
          reject(error);
        }
      );
    });
  }

  public fetchMovies(): Promise<void> {
    return new Promise((resolve, reject) => {
      this.http.get<Content[]>(`${this.apiURLMovie}/movies`).subscribe(
        async data => {
          this.movies = data.filter(m => m.is_displayed);
          this.notDisplayedMovies = data.filter(m => !m.is_displayed);

          // Fetch thumbnails for each movie : its not in the first call
          try {
            await Promise.all(
              this.movies.map(async m => {
                m.thumbnail = (await this.fetchPoster(m.show_id).toPromise()) || 'assets/img/default-episode.jpg';
              })
            );
            await Promise.all(
              this.notDisplayedMovies.map(async m => {
                m.thumbnail = (await this.fetchPoster(m.show_id).toPromise()) || 'assets/img/default-episode.jpg';
              })
            );
            resolve();
          } catch (error) {
            console.error("Error fetching thumbnails:", error);
            reject(error);
          }
        },
        error => {
          console.error("Error fetching movies:", error);
          reject(error);
        }
      );
    });
  }
  
  fetchPoster(id: number): Observable<string> {
    return this.http.get<any[]>(`${this.apiUrlPictures}/show/${id}`).pipe(
      map(pictures => {
        if (pictures.length > 0 && pictures[0].Picture) {
          return pictures[0].Picture.link;
        } else {
          console.warn(`No picture found for show ID ${id}`);
          return 'assets/img/default-episode.jpg';
        }
      })
    );
  }

  getDisplayedMovies(): Content[] {
     return this.movies;
  }
  getDisplayedSeries(): Content[] {
    return this.series;
  }

  getNonDisplayedMovies(): Content[] {
    return this.notDisplayedMovies;
  }
  getNonDisplayedSeries(): Content[] {
    return this.notDisplayedSeries;
  }

  /**
   * Display an alert message in the UI
   * @param message Message to display
   * @param type Type of alert (success or error)
   * @param duration How long to show the alert (ms)
   */
  showAlert(message: string, type: 'success' | 'error', duration: number = 3000): void {
    // Clear any existing timeout
    if (this.alertTimeout) {
      clearTimeout(this.alertTimeout);
    }
    
    this.alertMessage = message;
    this.alertType = type;
    
    // Auto-dismiss after duration
    this.alertTimeout = setTimeout(() => {
      this.hideAlert();
    }, duration);
  }

  /**
   * Hide the current alert
   */
  hideAlert(): void {
    this.alertMessage = '';
    this.alertType = '';
    if (this.alertTimeout) {
      clearTimeout(this.alertTimeout);
      this.alertTimeout = null;
    }
  }

  /**
   * Update the display status of a show
   * @param id Show ID
   * @param isDisplayed Whether the show should be displayed
   * @returns Observable of the updated show
   */
  updateShowDisplayStatus(id: number, isDisplayed: boolean): Promise<any> {
    return new Promise((resolve, reject) => {
      // Using PUT instead of PATCH to avoid CORS issues
      this.http.put(`http://localhost:3000/api/shows/${id}/displayed`, { is_displayed: isDisplayed })
        .pipe(
          map((response: any) => {
            // Show success alert
            this.showAlert(`Success! ${isDisplayed ? 'Added' : 'Removed'} show with ID: ${id}`, 'success');
            return response;
          }),
          catchError(error => {
            console.error('ERROR', error);
            // Show error alert
            this.showAlert(`Failed to ${isDisplayed ? 'add' : 'remove'} show with ID: ${id}`, 'error');
            // Throw a more specific error message
            return throwError(() => new Error('Failed to update show status'));
          })
        )
        .subscribe({
          next: (response) => {
            resolve(response);
          },
          error: (error) => {
            console.error('Subscription error:', error);
            reject(error);
          }
        });
    });
  }
}

