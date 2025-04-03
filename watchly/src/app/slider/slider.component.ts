import { Component, OnInit, Input, ViewChild, OnChanges, SimpleChanges } from '@angular/core';
import { Content } from '../models/content';
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
  @Input() content: Content[] = [];

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
}
