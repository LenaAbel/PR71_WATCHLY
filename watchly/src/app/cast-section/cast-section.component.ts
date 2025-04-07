import { Component, OnInit, Input } from '@angular/core';
import { Actor } from '../models/actor';

@Component({
  selector: 'app-cast-section',
  templateUrl: './cast-section.component.html',
  styleUrls: ['./cast-section.component.css']
})
/**
 * Component to display the cast section of a movie or series.
 * It shows a list of actors with their names and character roles.
 * @param cast - Array of Actor objects representing the cast of the show.
 * @param showId - The ID of the movie or series.
 */
export class CastSectionComponent implements OnInit {
  @Input() cast: Actor[] = [];
   
  @Input() showId!: number;
  constructor() { }

  ngOnInit(): void {

  }

}
