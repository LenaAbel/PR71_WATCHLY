import { Component, Input, OnInit, EventEmitter, Output } from '@angular/core';
import { Content } from '../models/content';
import { trigger, transition, style, animate, query, stagger } from '@angular/animations';

@Component({
  selector: 'app-slider-titled',
  templateUrl: './slider-titled.component.html',
  styleUrls: ['./slider-titled.component.css'],
  animations: [
    trigger('cardAnimation', [
      transition(':enter', [
        style({ opacity: 0, transform: 'scale(0.9) translateY(20px)' }),
        animate('300ms ease-out', style({ opacity: 1, transform: 'scale(1) translateY(0)' }))
      ]),
      transition(':leave', [
        animate('300ms ease-in', style({ 
          opacity: 0, 
          transform: 'scale(0.9) translateY(20px)'
        }))
      ])
    ]),
    trigger('listAnimation', [
      transition('* => *', [
        query(':enter', [
          style({ opacity: 0 }),
          stagger('80ms', [
            animate('300ms ease-out', style({ opacity: 1 }))
          ])
        ], { optional: true })
      ])
    ])
  ]
})
/**
 * Component to display a titled slider of movies or series.
 * @param title - The title of the slider.
 * @param type - Type of content ('movie' or 'series').
 * @param buttonType - Type of button ('delete' or 'add').
 * @param content - Array of Content objects representing the items to be displayed in the slider.
 * @param animateCards - Boolean to control card animation.
 */
export class SliderTitledComponent implements OnInit {
  @Input() title: string = '';
  @Input() type: string = '';
  @Input() buttonType: string = ''; // delete or add
  @Input() content: Content[] = [];
  @Input() animateCards: boolean = false;
  @Output() buttonClick = new EventEmitter<Content>();

  constructor() { }

  ngOnInit(): void {
  }

  handleButtonClick(show: Content): void {
    this.buttonClick.emit(show); 
  }
  
  // Track function for optimizing animations
  trackById(index: number, show: Content): number {
    return show.show_id;
  }
}
