import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Content } from '../models/content';

@Component({
  selector: 'app-content-section',
  templateUrl: './content-section.component.html',
  styleUrls: ['./content-section.component.css']
})
export class ContentSectionComponent implements OnInit {
  @Input() type!: string;
  @Input() content!: Content;
  @Output() openRating = new EventEmitter<void>();

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
  }

  onOpenRating(): void {
    this.openRating.emit();
  }
}
