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
  isLoading = true;
  isLoggedIn = false;

constructor(private authService: AuthenticationService) {
    this.isLoggedIn = this.authService.isLoggedIn();
  }

  ngOnInit(): void {
    setTimeout(() => {
      this.isLoading = false;
    }, 100); 
  }

  onOpenRating(): void {
    this.openRating.emit();
  }
}
