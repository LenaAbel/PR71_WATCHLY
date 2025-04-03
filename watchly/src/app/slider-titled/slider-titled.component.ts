import { Component, Input, OnInit } from '@angular/core';
import { Content } from '../models/content';

@Component({
  selector: 'app-slider-titled',
  templateUrl: './slider-titled.component.html',
  styleUrls: ['./slider-titled.component.css']
})
export class SliderTitledComponent implements OnInit {
  @Input() title: string = '';
  @Input() type: string = '';
  @Input() content: Content[] = [];
  constructor() { }

  ngOnInit(): void {
  }

}
