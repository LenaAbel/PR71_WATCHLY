import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Content } from '../models/content';
import { AuthenticationService } from '../services/authentification.service';
@Component({
  selector: 'app-content-section',
  templateUrl: './content-section.component.html',
  styleUrls: ['./content-section.component.css']
})
export class ContentSectionComponent implements OnInit {
  @Input() type!: string;
  @Input() content!: Content;
  @Output() openRating = new EventEmitter<void>();
  @Output() ratingSubmitted = new EventEmitter<void>();

  constructor(private http: HttpClient, private authService: AuthenticationService) {}

  ngOnInit(): void {
    // Remove initialization since we're using the getter
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
