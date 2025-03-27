import { Component, Input } from '@angular/core';
import { Actor } from '../models/actor';

@Component({
  selector: 'app-actor-card',
  templateUrl: './actor-card.component.html',
  styleUrls: ['./actor-card.component.css']
})
export class ActorCardComponent {
  @Input() pageTitle: string = '';

  actor: Actor = {
    name: '',
    character: '',
    profile_path: ''
  };

  constructor() {
  }

  ngOnInit() {
    /*this.actor.name = 'Kevin';
    this.actor.lastName = 'Alejandro';
    this.actor.characterName = 'Jayce';
    this.actor.imgSrc = 'assets/img/jayce.jpg';*/
  }
}
