import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { SwiperComponent } from 'swiper/angular';
import Swiper, { Navigation, Pagination, Keyboard } from 'swiper';

Swiper.use([Navigation, Pagination, Keyboard]);

@Component({
  selector: 'app-season-dropdown',
  templateUrl: './season-dropdown.component.html',
  styleUrls: ['./season-dropdown.component.css']
})
export class SeasonDropdownComponent implements OnInit {

  @Input() active !: boolean;
  @Input() page !: any;
  @Input() season !: any;
  episodes !: any[];
  seasonNumber !: number;
  @ViewChild(SwiperComponent, { static: false }) swiper?: SwiperComponent;

  slideNext() {
    this.swiper?.swiperRef.slideNext();
  }

  slidePrev() {
    this.swiper?.swiperRef.slidePrev();
  }

  toggleSeasonDropdown() {
    if (this.active) {
      this.active = false;
    }
    else {
      this.active = true;
    }
  }

  constructor() { }

  ngOnInit(): void {
    this.episodes = this.season.episodes
    this.seasonNumber = this.season.seasonNumber;
  }

}
