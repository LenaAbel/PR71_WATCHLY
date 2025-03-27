import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, UrlSegment } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-show-page',
  templateUrl: './show-page.component.html',
  styleUrls: ['./show-page.component.css']
})
export class ShowPageComponent implements OnInit {
  showId!: number;
  type!: string;
  show: any;
  cast: any;

  constructor(private route: ActivatedRoute, private http: HttpClient) {}

  ngOnInit(): void {
    this.route.url.subscribe((segments: UrlSegment[]) => {
      if (segments.length > 0) {
        this.type = segments[0].path; // "movies" or "series"
        this.showId = Number(this.route.snapshot.paramMap.get('id'));

        this.getShow(this.type, this.showId);
        this.getCast(this.showId);
      }
    });
  }

  getShow(type: string, id: number): void {
    const endpoint = `http://localhost:3000/api/shows/${id}`;
    this.http.get(endpoint).subscribe({
      next: (data) => {
        this.show = data;
        console.log(`Fetched ${type} with id ${id}:`, data);
      },
      error: (err) => {
        console.error(`Error fetching ${type} with id ${id}:`, err);
      }
    });
  }

  getCast(id: number): void {
    const endpoint = `http://localhost:3000/api/casting/show/${id}/actors`;
    this.http.get(endpoint).subscribe({
      next: (data) => {
        this.cast = data;
        
        console.log(`Fetched cast with id ${id}:`, data);
      },
      error: (err) => {
        console.error(`Error fetching cast with id ${id}:`, err);
      }
    });
  }
}
