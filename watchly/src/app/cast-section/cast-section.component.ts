import { Component, OnInit, Input } from '@angular/core';
import { Actor } from '../models/actor';

@Component({
  selector: 'app-cast-section',
  templateUrl: './cast-section.component.html',
  styleUrls: ['./cast-section.component.css']
})
export class CastSectionComponent implements OnInit {
  @Input() cast: Actor[] = [];
   
  @Input() showId!: number;
  constructor() { }

  ngOnInit(): void {

  }

}
