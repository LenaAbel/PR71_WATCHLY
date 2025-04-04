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
  isLoggedIn = false;
  constructor(private http: HttpClient, private authService: AuthenticationService) {}

  ngOnInit(): void {
    this.isLoggedIn = this.authService.isLoggedIn();
  }

  onOpenRating(): void {
    this.openRating.emit();
  }
}
