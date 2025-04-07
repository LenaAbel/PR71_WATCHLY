import { Component, OnInit, ElementRef, ViewChildren, QueryList, AfterViewInit, OnDestroy, Input } from '@angular/core';

@Component({
  selector: 'app-poster-section',
  templateUrl: './poster-section.component.html',
  styleUrls: ['./poster-section.component.css']
})
/**
 * Component to display a section of posters for a specific show.
 * It shows a grid of images (posters) related to the show.
 * @param images - Array of image URLs to be displayed in the grid.
 * @param showId - The ID of the movie or series.
 */
export class PosterSectionComponent {
  @Input() images: string[] = [];
  @Input() showId!: number;

  ngOnInit(): void {}
}