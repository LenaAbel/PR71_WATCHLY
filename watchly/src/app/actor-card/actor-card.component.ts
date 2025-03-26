import { Component, Input } from '@angular/core';
import { Actor } from '..actor.js';

@Component({
  selector: 'app-actor-card',
  templateUrl: './actor-card.component.html',
  styleUrls: ['./actor-card.component.css']
})
export class ActorCardComponent {
  @Input() actor!: Actor;
}
