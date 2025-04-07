import { Component, Input, OnInit } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-trailer-banner',
  templateUrl: './trailer-banner.component.html',
  styleUrls: ['./trailer-banner.component.css']
})
/**
 * Component to display a trailer banner for a show.
 * @param showId - The ID of the show for which the trailer is to be displayed.
 * @param embedLink - The sanitized URL for the YouTube trailer.
 * @param sanitizer - Service to sanitize the URL for safe embedding.
 * @param http - Service to make HTTP requests.
 */
export class TrailerBannerComponent implements OnInit {

  @Input() showId!: number;
  embedLink!: SafeResourceUrl;

  constructor(private sanitizer: DomSanitizer, private http: HttpClient) { }

  ngOnInit(): void {
    this.getTrailerLink(this.showId);
  }


  getTrailerLink(id: number): void {
    const endpoint = `http://localhost:3000/api/shows/${id}/trailer`;
    this.http.get(endpoint).subscribe({
      next: (data) => {
        if (typeof data === 'string') {
          this.embedLink = this.sanitizeURL(data);
        } else {
          console.error('Unexpected data type:', data);
        }
      },
      error: (err) => {
        console.error(`Error fetching with id ${id}:`, err);
      }
    });
  }

  sanitizeURL(url: string): SafeResourceUrl {
    const link = 'https://www.youtube.com/embed/' + url + '?playlist=' + url + '&autoplay=1&mute=1&loop=1&controls=0&modestbranding=1&rel=0';
    return this.sanitizer.bypassSecurityTrustResourceUrl(link);
  }

}
