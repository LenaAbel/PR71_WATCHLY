import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Content } from '../models/content';
import { AuthenticationService } from '../services/authentification.service';

@Component({
  selector: 'app-content-section',
  templateUrl: './content-section.component.html',
  styleUrls: ['./content-section.component.css']
})
/**
 * Component to display a section for movies or series.
 * @param type - The type of content (movies or series).
 * @param content - The content object containing details about the movie or series.
 * @param openRating - Event emitter to notify when the rating section is opened.
 * @param ratingSubmitted - Event emitter to notify when a rating is submitted.
 * @param isLoading - Indicates if the content is still loading.
 */
export class ContentSectionComponent implements OnInit {
  @Input() type!: string;
  @Input() content!: Content;
  @Output() openRating = new EventEmitter<void>();
  @Output() ratingSubmitted = new EventEmitter<void>();
  isLoading = true;
  
  constructor(private http: HttpClient, private authService: AuthenticationService) {
    // Remove the isLoggedIn assignment here
  }

  ngOnInit(): void {
    // Empty since we're using the getter
    setTimeout(() => {
      this.isLoading = false;
    }, 100); 
  }

  onOpenRating(): void {
    this.openRating.emit();
  }

  get isLoggedIn(): boolean {
    return this.authService.isLoggedIn();
  }

  onDeleteRating(): void {
    const userData = JSON.parse(localStorage.getItem('userData') || '{}');
    this.http.delete(`http://localhost:3000/api/favorites/user/${userData.id}/show/${this.content.show_id}`)
      .subscribe(() => {
        window.location.reload();
      });
  }
}
