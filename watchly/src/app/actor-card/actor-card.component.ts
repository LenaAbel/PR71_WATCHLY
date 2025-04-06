import { Component, Input } from '@angular/core';
import { Actor } from '../models/actor';

@Component({
  selector: 'app-actor-card',
  templateUrl: './actor-card.component.html',
  styleUrls: ['./actor-card.component.css']
})
export class ActorCardComponent {
  @Input() pageTitle!: any;
  @Input() actor!: Actor;

  get imageUrl(): string {
    return this.actor.profile_path
      ? `https://image.tmdb.org/t/p/w200${this.actor.profile_path}`
      : 'assets/img/default-person.jpg';
  }
}
