import { Component, OnInit } from '@angular/core';
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

  @Input() type!: string; // 'movie' or 'series'
  @Input() content: Content[] = [];
  @Input() buttonType!: string; // delete or add

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

  deleteContent(movie: any): void {
    // put is_displayed to false in the api
  }
}
