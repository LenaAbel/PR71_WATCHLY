import { Component, OnInit, Input, ViewChild, ContentChild, TemplateRef, OnChanges, SimpleChanges } from '@angular/core';
import { Content } from '../models/content';
import { SwiperComponent } from 'swiper/angular';
import Swiper, { Navigation, Pagination, Keyboard } from 'swiper';

Swiper.use([Navigation, Pagination, Keyboard]);

@Component({
  selector: 'app-slider',
  templateUrl: './slider.component.html',
  styleUrls: ['./slider.component.css']
})
/**
 * Component to display a slider of movies or series.
 * @param items - Array of Content objects representing the items to be displayed in the slider.
 * @param type - Type of content ('movie' or 'series').
 * @param itemTemplate - Template reference for the item to be displayed in the slider.
 * @param content - Array of Content objects representing the content to be displayed.
 * @param swiperRef - Reference to the Swiper instance for navigation.
 */
export class SliderComponent implements OnInit {
  @Input() items: Content[] = [];
  @Input() type!: string; // 'movie' or 'series'
  @Input() itemTemplate!: TemplateRef<any>;
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
