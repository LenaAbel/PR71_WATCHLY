import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { SwiperComponent } from 'swiper/angular';
import Swiper, { Navigation, Pagination, Keyboard } from 'swiper';

Swiper.use([Navigation, Pagination, Keyboard]);

@Component({
  selector: 'app-season-dropdown',
  templateUrl: './season-dropdown.component.html',
  styleUrls: ['./season-dropdown.component.css']
})
/**
 * Component to display a dropdown of episodes for a specific season of a show.
 * @param active - Boolean to control the visibility of the dropdown.
 * @param page - The current page of the application.
 * @param season - The season object containing information about the episodes.
 * @param episodes - Array of episode objects for the selected season.
 * @param seasonNumber - The number of the current season.
 * @param swiperRef - Reference to the Swiper instance for navigation.
*/
export class SeasonDropdownComponent implements OnInit {

  @Input() active !: boolean;
  @Input() page !: any;
  @Input() season !: any;
  episodes !: any[];
  seasonNumber !: number;
  @ViewChild(SwiperComponent, { static: false }) swiper?: SwiperComponent;

  swiperRef: Swiper | undefined;

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

  onSwiper(swiper: Swiper) {
    this.swiperRef = swiper;
  }

  constructor() { }

  ngOnInit(): void {
    this.episodes = this.season.episodes
    this.seasonNumber = this.season.seasonNumber;
  }

}
