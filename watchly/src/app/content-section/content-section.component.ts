import { Component, Input, OnInit } from '@angular/core';
import { Content } from '../models/content';

@Component({
  selector: 'app-content-section',
  templateUrl: './content-section.component.html',
  styleUrls: ['./content-section.component.css']
})
export class ContentSectionComponent implements OnInit {
  @Input() type!: string;
  @Input() content!: Content;

  constructor() {}

  ngOnInit(): void {
  }
}
    