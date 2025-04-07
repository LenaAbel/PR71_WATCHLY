import { Component, Input } from '@angular/core';
import { Actor } from '../models/actor';

@Component({
  selector: 'app-actor-card',
  templateUrl: './actor-card.component.html',
  styleUrls: ['./actor-card.component.css']
})
/**
 * Component to display actor information in a card format.
 * It shows the actor's name, image, and a link to their details.
 * The image is fetched from TMDB using the actor's profile path.
 * If the profile path is not available, a default image is used.
 * @param pageTitle - The title of the page where the actor card is displayed.
 * @param actor - The actor object containing information about the actor.
 */
export class ActorCardComponent {
  @Input() pageTitle!: string;
  @Input() actor!: Actor;

  get imageUrl(): string {
    return this.actor.profile_path
      ? `https://image.tmdb.org/t/p/w200${this.actor.profile_path}`
      : 'assets/img/default-person.jpg';
  }
}
