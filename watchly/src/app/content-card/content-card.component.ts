import { Component, Input, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Content } from '../models/content';

@Component({
  selector: 'app-content-card',
  templateUrl: './content-card.component.html',
  styleUrls: ['./content-card.component.css']
})
export class ContentCardComponent implements OnInit {
  @Input() type! : string;
  @Input() content! : Content;
  alertMessage: string = '';
  alertType: 'success' | 'error' | '' = '';

  constructor(private http: HttpClient) {}

  ngOnInit() {
    // Ensure thumbnail is available
    if (!this.content || !this.content.thumbnail || this.content.thumbnail.trim() === '') {
      if (this.content) {
        this.content.thumbnail = 'assets/img/default-poster.jpg';
      }
    }
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
}
