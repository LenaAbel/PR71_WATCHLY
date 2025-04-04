import { Component, Input, OnInit, EventEmitter, Output } from '@angular/core';
import { Content } from '../models/content';

@Component({
  selector: 'app-slider-titled',
  templateUrl: './slider-titled.component.html',
  styleUrls: ['./slider-titled.component.css']
})
export class SliderTitledComponent implements OnInit {
  @Input() title: string = '';
  @Input() type: string = '';
  @Input() buttonType: string = ''; // delete or add
  @Input() content: Content[] = [];
  @Output() buttonClick = new EventEmitter<Content>();

  constructor() { }

  ngOnInit(): void {
  }

  handleButtonClick(show: Content): void {
    console.log('Button clicked for show:', show);
    this.buttonClick.emit(show); 
  }
}
