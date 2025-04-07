import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, UrlSegment } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Actor } from '../models/actor';
import { Router } from '@angular/router';
import { Utils } from '../utils';

@Component({
  selector: 'app-cast-page',
  templateUrl: './cast-page.component.html',
  styleUrls: ['./cast-page.component.css']
})
/**
 * Component to display the cast of a movie or series.
 * @param showId - The ID of the movie or series.
 * @param type - The type of the show (either "movies" or "series").
 * @param cast - Array of Actor objects representing the cast of the show.
 * @param route - ActivatedRoute service to access route parameters.
 * @param http - HttpClient service to make HTTP requests.
 * @param router - Router service to navigate between pages.
 */
export class CastPageComponent implements OnInit {
  showId!: number;
  type!: string;
  cast: Actor[] = [];

  constructor(private route: ActivatedRoute, private http: HttpClient, private router : Router) {}

  ngOnInit(): void {
    this.route.url.subscribe((segments: UrlSegment[]) => {
      if (segments.length > 0) {
        this.type = segments[0].path; // "movies" or "series"
        this.showId = Number(this.route.snapshot.paramMap.get('id'));

        this.getCast(this.showId);
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
        Utils.redirection404(this.router);
      }
    });
  }
}
