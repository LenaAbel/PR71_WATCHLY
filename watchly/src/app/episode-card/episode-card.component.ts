import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-episode-card',
  templateUrl: './episode-card.component.html',
  styleUrls: ['./episode-card.component.css']
})
export class EpisodeCardComponent implements OnInit {

  @Input() episode: any;

  constructor() { }

  ngOnInit(): void {
  }

}
