import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-episode-card',
  templateUrl: './episode-card.component.html',
  styleUrls: ['./episode-card.component.css']
})
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
