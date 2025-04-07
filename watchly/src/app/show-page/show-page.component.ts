import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, UrlSegment } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Actor } from '../models/actor';
import { Content } from '../models/content';
import { AuthenticationService } from '../services/authentification.service';
import { Utils } from '../utils';
import { Router } from '@angular/router';
@Component({
  selector: 'app-show-page',
  templateUrl: './show-page.component.html',
  styleUrls: ['./show-page.component.css']
})
export class ShowPageComponent implements OnInit {
  showId!: number;
  type!: string;
  show!: Content;
  cast: any;
  episodes!: any[];
  groupedSeasons!: any[];
  images!: any[];
  isRatingPopupOpen = false;
  isLoggedIn = false;
  constructor(private route: ActivatedRoute, private http: HttpClient, private authService: AuthenticationService, private router :Router) {}

  ngOnInit(): void {
    this.type = this.route.snapshot.url.some(segment => segment.path === 'episode')
      ? 'episode'
      : this.route.snapshot.url[0].path;
    this.showId = Number(this.route.snapshot.paramMap.get('id'));
    if (this.type !== 'episode') {
      this.getShow(this.showId);
    } else {
      this.getEpisode(Number(this.route.snapshot.paramMap.get('episodeId')));
    }
    this.getCast(this.showId);
    this.getImages(this.showId);
    this.isLoggedIn = this.authService.isLoggedIn();
  }

  getShow(id: number): void {
    const userData = JSON.parse(localStorage.getItem('userData') || '{}');
    const userId = userData.id || 'unknown';
    const endpoint = `http://localhost:3000/api/shows/${id}`;
    const options = userId !== 'unknown' ? { params: { user_id: userId } } : {};

    this.http.get(endpoint, options).subscribe({
      next: (data) => {
        this.show = data as Content;
        if (this.show.is_movie) {
          this.type = 'movie';
        } else {
          this.type = 'series';
          this.getEpisodes(this.showId);
        }
        
      },
      error: (err) => {
        console.error(`Error fetching with id ${id}:`, err);
        Utils.redirection404(this.router);
      }
    });
  }

  getCast(id: number): void {
    const endpoint = `http://localhost:3000/api/casting/show/${id}/actors`;
    this.http.get<any[]>(endpoint).subscribe({
      next: (data) => {
        this.cast = data.map(actor => new Actor(
          actor.name,
          actor.character,
          actor.profile_path
        ));
      },
      error: (err) => {
        console.error(`Error fetching cast with id ${id}:`, err);
      }
    });
  }

  getEpisodes(id: number): void {
    const endpoint = `http://localhost:3000/api/episodes/${id}/episodes`;
    this.http.get<any[]>(endpoint).subscribe({
      next: (data: any[]) => {
        this.episodes = data;
        this.groupSeasons();
        this.show.episodes = this.episodes.length;
      },
      error: (err) => {
        console.error(`Error fetching with id ${id}:`, err);
        Utils.redirection404(this.router);
      }
    });
  }

  groupSeasons(): void {
    const seasonGroups = this.episodes.reduce((acc: any, episode: any) => {
      const seasonNumber = episode.season;

      if (!acc[seasonNumber]) {
        acc[seasonNumber] = [];
      }

      acc[seasonNumber].push(episode);
      return acc;
    }, {});

    this.groupedSeasons = Object.keys(seasonGroups).map(seasonNumber => ({
      seasonNumber: Number(seasonNumber),
      episodes: seasonGroups[seasonNumber],
    }));
    this.show.seasons = Math.max(...this.groupedSeasons.map(season => Number(season.seasonNumber)));
  }

  getImages(id: number): void {
    const endpoint = `http://localhost:3000/api/pictures/show/${id}`;
    this.http.get<any[]>(endpoint).subscribe({
      next: (data: any[]) => {
        this.images = data;
      },
      error: (err) => {
        console.error(`Error fetching with id ${id}:`, err);
      }
    });
  }

  getEpisode(id: number): void {
    const endpoint = `http://localhost:3000/api/episodes/${id}`;
    this.http.get(endpoint).subscribe({
      next: (data) => {
        this.show = data as Content;
        console.log(`Fetched  with id ${id}:`, data);
      },
      error: (err) => {
        console.error(`Error fetching with id ${id}:`, err);
      }
    });
  }

  openRatingPopup(): void {
    this.isRatingPopupOpen = true;
  }

  closeRatingPopup(): void {
    this.isRatingPopupOpen = false;
  }

  onRatingSubmitted(rating: number): void {
    this.addRating(rating);
    this.closeRatingPopup();
    // Reload the page after rating is submitted
    window.location.reload();
  }

  addRating(rating: number): void{
    const userData = JSON.parse(localStorage.getItem('userData') || '{}');
    const body = {
      show_id: this.show.show_id,
      person_id: userData.id || 'unknown',
      rating: rating,
      is_watched: false
    };

    this.http.post('http://localhost:3000/api/favorites/', { body: body })
      .subscribe(response => {
      }, error => {
        console.error('Error adding rating:', error);
      });
  }
}
