import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { Content } from '../models/content';

@Injectable({
  providedIn: 'root'
})
export class ShowsService {
  private apiUrl = 'http://localhost:3000/api/shows';
  private apiUrlPictures = 'http://localhost:3000/api/pictures';

  public movies: Content[] = [];
  public series: Content[] = [];
  public notDisplayedMovies: Content[] = [];
  public notDisplayedSeries: Content[] = [];
  public favoritesMovies: Content[] = [];
  public favoritesSeries: Content[] = [];
  constructor(private http: HttpClient) { 
  }
  async ngOnInit() {
    await this.initializeContent();
  }

  public async initializeContent(): Promise<void> {
    try {
      await this.fetchMovies();
      await this.fetchSeries();
    } catch (error) {
      console.error('Error initializing content:', error);
    }
  }

  public fetchSeries(){
    return new Promise((resolve, reject) => {
      this.http.get<Content[]>(`${this.apiUrl}/tv`).subscribe(
        async data => {
          this.series = data.filter(m => m.is_displayed);
          this.notDisplayedSeries = data.filter(m => !m.is_displayed);

          // Fetch thumbnails for each series : its not in the first call
          try {
            await Promise.all(
              this.series.map(async s => {
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
      this.http.get<Content[]>(`${this.apiUrl}/movies`).subscribe(
        async data => {
          this.movies = data.filter(m => m.is_displayed);
          this.notDisplayedMovies = data.filter(m => !m.is_displayed);

          // Fetch thumbnails for each movie
          try {
            await Promise.all(
              this.movies.map(async m => {
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

  // getFavoritesMovies(): Content[] {}
  // getFavoritesSeries(): Content[] {}

  // updateMovie(movie: Content): Observable<Content> {
  // }
  // updateSeries(series: Content): Observable<Content> {
  // }

}

