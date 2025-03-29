import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-episodes-section',
  templateUrl: './episodes-section.component.html',
  styleUrls: ['./episodes-section.component.css']
})
export class EpisodesSectionComponent implements OnInit {
  @Input() groupedSeasons !: any[];
  constructor() { }

  ngOnInit(): void {
  }

}
