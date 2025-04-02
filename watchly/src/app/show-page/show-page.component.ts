import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, UrlSegment } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Actor } from '../models/actor';
import { Content } from '../models/content';
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


  constructor(private route: ActivatedRoute, private http: HttpClient) {}

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
  }

  getShow(id: number): void {
    const endpoint = `http://localhost:3000/api/shows/${id}`;
    this.http.get(endpoint).subscribe({
      next: (data) => {
        this.show = data as Content;
        console.log(`Fetched with id ${id}:`, data);
        console.log(this.show);
        if (this.show.is_movie) {
        this.type = 'movie';
        } else {
          this.type = 'series';
          this.getEpisodes(this.showId);
        }

      },
      error: (err) => {
        console.error(`Error fetching with id ${id}:`, err);
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
        console.log(`Fetched with id ${id}:`, data);
        console.log(this.groupedSeasons);

      },
      error: (err) => {
        console.error(`Error fetching with id ${id}:`, err);
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
        console.log(`Fetched with id ${id}:`, data);
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
}
