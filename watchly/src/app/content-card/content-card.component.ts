import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Content } from '../models/content';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-content-card',
  templateUrl: './content-card.component.html',
  styleUrls: ['./content-card.component.css']
})
export class ContentCardComponent implements OnInit {
  @Input() type! : string;
  @Input() content! : Content;
  @Output() favoriteDeleted = new EventEmitter<void>();
  alertMessage: string = '';
  alertType: 'success' | 'error' | '' = '';

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    // Debug: Log the content object to see what's being received
    // console.log(`Content card for ${this.content.name}, type: ${this.type}`, this.content);
  }

  onDeleteFavorite(event: Event): void {
    event.preventDefault();
    event.stopPropagation();
    
    const userData = JSON.parse(localStorage.getItem('userData') || '{}');
    if (userData.id && this.content.show_id) {
      this.http.delete(`http://localhost:3000/api/favorites/user/${userData.id}/show/${this.content.show_id}`)
        .subscribe({
          next: () => {
            this.showAlert('Show removed from favorites', 'success');
            setTimeout(() => window.location.reload(), 1500);
            this.favoriteDeleted.emit();
          },
          error: () => {
            this.showAlert('Error removing show from favorites', 'error');
          }
        });
    }
  }

  private showAlert(message: string, type: 'success' | 'error'): void {
    this.alertMessage = message;
    this.alertType = type;
    setTimeout(() => {
      this.alertMessage = '';
      this.alertType = '';
    }, 3000);
  }

  // Helper method to safely get seasons count
  getSeasonsCount(): number {
    // Return seasons count or 0 if not available
    if (this.content.seasons !== undefined && this.content.seasons !== null) {
      return this.content.seasons;
    }
    // Try to get from episodes array if available
    if (this.content.episodes && Array.isArray(this.content.episodes)) {
      const seasons = [...new Set(this.content.episodes.map((ep: any) => ep.season))];
      return seasons.length;
    }
    return 0;
  }
}
