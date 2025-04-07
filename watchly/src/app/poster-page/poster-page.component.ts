import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, UrlSegment } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-poster-page',
  templateUrl: './poster-page.component.html',
  styleUrls: ['./poster-page.component.css']
})
export class PosterPageComponent implements OnInit {

  showId!: number ;

  constructor(private route: ActivatedRoute, private http: HttpClient) { }

  ngOnInit(): void {
    this.route.url.subscribe((segments: UrlSegment[]) => {
          if (segments.length > 0) {
            this.showId = Number(this.route.snapshot.paramMap.get('id'));
          }
    });

    this.getImages(this.showId);
  }

  images: any[] = [];

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

}
