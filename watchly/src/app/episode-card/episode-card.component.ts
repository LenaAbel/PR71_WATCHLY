import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-episode-card',
  templateUrl: './episode-card.component.html',
  styleUrls: ['./episode-card.component.css']
})
/**
 * Component to display episode information in a card format.
 * @param episode - The episode object containing information about the episode.
 * @param defaultImage - The default image to be displayed if no thumbnail is available.
 */
export class EpisodeCardComponent implements OnInit {

  @Input() episode: any;
  defaultImage = 'assets/img/default-episode.jpg';  

  constructor() { }

  ngOnInit(): void {
  }

  getImageUrl(): string {
    return this.episode?.thumbnail || this.defaultImage;
  }

}
