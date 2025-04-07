import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-episodes-section',
  templateUrl: './episodes-section.component.html',
  styleUrls: ['./episodes-section.component.css']
})
/**
 * Component to display a section for episodes of a show.
 * @param groupedSeasons - Array of seasons, each containing an array of episodes.
 * @param showId - The ID of the show for which episodes are displayed.
 */
export class EpisodesSectionComponent implements OnInit {
  @Input() groupedSeasons !: any[];
  @Input() showId !: number;
  constructor() { }

  ngOnInit(): void {
  }

}
