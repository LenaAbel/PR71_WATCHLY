import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { Content } from '../models/content';
import { ShowsService } from '../services/shows.service';
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
  movies: Content[] = [];
  series: Content[] = [];
  @Input() content: Content[] = [];

  @ViewChild(SwiperComponent, { static: false }) swiper?: SwiperComponent;

  swiperRef: Swiper | undefined;
  constructor(private showsService: ShowsService) {}

  slideNext() {
    this.swiper?.swiperRef.slideNext();
    this.content = this.type === 'movie' ? this.movies : this.series;
  }

  slidePrev() {
    this.swiper?.swiperRef.slidePrev();
    this.content = this.type === 'movie' ? this.movies : this.series;
  }

  onSwiper(swiper: Swiper) {
    this.swiperRef = swiper;
  }

  async ngOnInit(): Promise<void> {
    await this.showsService.initializeContent();
    this.movies = this.showsService.getDisplayedMovies();
    this.series = this.showsService.getDisplayedSeries();
    this.content = this.type === 'movie' ? this.movies : this.series;
  }

}
