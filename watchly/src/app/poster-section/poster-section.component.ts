import { Component, OnInit, ElementRef, ViewChildren, QueryList, AfterViewInit, OnDestroy, Input } from '@angular/core';

@Component({
  selector: 'app-poster-section',
  templateUrl: './poster-section.component.html',
  styleUrls: ['./poster-section.component.css']
})
export class PosterSectionComponent {
  @Input() images: any[] = [];
  @Input() showId!: number;

  ngOnInit(): void {}
}