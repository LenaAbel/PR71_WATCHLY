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
