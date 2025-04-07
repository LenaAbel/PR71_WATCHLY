import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { Content } from '../models/content';
import { SwiperComponent } from 'swiper/angular';
import Swiper, { Navigation, Pagination, Keyboard } from 'swiper';
import { Input, ViewChild } from '@angular/core';

@Component({
  selector: 'app-slider-button',
  templateUrl: './slider-button.component.html',
  styleUrls: ['./slider-button.component.css']
})
/**
 * Component to display a slider of movies or series with buttons to add or delete content.
 * @param type - Type of content ('movie' or 'series').
 * @param content - Array of Content objects representing the items to be displayed in the slider.
 * @param buttonType - Type of button ('delete' or 'add').  
 * @param isClicked - Boolean to control the visibility of the button.
 * @param selectedItem - The currently selected item in the slider.
 * @param swiperRef - Reference to the Swiper instance for navigation.
 */
export class SliderButtonComponent implements OnInit {
  @Output() buttonClick = new EventEmitter<Content>();

  @Input() type!: string; // 'movie' or 'series'
  @Input() content: Content[] = [];
  @Input() buttonType!: string; // delete or add
  isClicked: boolean = false;
  selectedItem: Content | null = null;

  @ViewChild(SwiperComponent, { static: false }) swiper?: SwiperComponent;

  swiperRef: Swiper | undefined;
  constructor() {}
  ngOnInit(): void {
  }

  slideNext() {
    this.swiper?.swiperRef.slideNext();
  }

  slidePrev() {
    this.swiper?.swiperRef.slidePrev();
  }

  onSwiper(swiper: Swiper) {
    this.swiperRef = swiper;
  }

  handleChange(show: Content): void {
    this.isClicked = !this.isClicked;
    this.selectedItem = show;
    this.buttonClick.emit(show); // Emit the event to the parent
  }
}
