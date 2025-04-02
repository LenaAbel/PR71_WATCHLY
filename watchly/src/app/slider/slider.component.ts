import { Component, OnInit, Input, ViewChild } from '@angular/core';

import { SwiperComponent } from 'swiper/angular';
import Swiper, { Navigation, Pagination, Keyboard } from 'swiper';

Swiper.use([Navigation, Pagination, Keyboard]);

@Component({
  selector: 'app-slider',
  templateUrl: './slider.component.html',
  styleUrls: ['./slider.component.css']
})
export class SliderComponent implements OnInit {

  @Input() type!: string; // 'movie' or 'series'
  @ViewChild(SwiperComponent, { static: false }) swiper?: SwiperComponent;

  swiperRef: Swiper | undefined;
  constructor() { }

  slideNext() {
    this.swiper?.swiperRef.slideNext();
  }

  slidePrev() {
    this.swiper?.swiperRef.slidePrev();
  }

  onSwiper(swiper: Swiper) {
    this.swiperRef = swiper;
  }

  ngOnInit(): void {
  }

}
