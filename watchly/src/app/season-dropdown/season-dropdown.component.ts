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

  @ViewChild(SwiperComponent, { static: false }) swiper?: SwiperComponent;


  episodes = [
    {
      title: 'Welcome to the Playground',
      episode: 'E1 - 40 min',
      description: 'Orphaned sisters Vi and Powder bring trouble to Zaun’s underground streets...',
      image: 'assets/img/wQEW3xLrQAThu1GvqpsKQyejrYS.jpg',
    },
    {
      title: 'Some Mysteries Are Better Left Unsolved',
      episode: 'E2 - 40 min',
      description: 'Idealistic inventor Jayce attempts to harness magic through science...',
      image: 'assets/img/wQEW3xLrQAThu1GvqpsKQyejrYS.jpg',
    },
    {
      title: 'The Base Violence Necessary for Change',
      episode: 'E3 - 40 min',
      description: 'An epic showdown between old rivals results in a fateful moment...',
      image: 'assets/img/wQEW3xLrQAThu1GvqpsKQyejrYS.jpg',
    },
    {
      title: 'The Base Violence Necessary for Change',
      episode: 'E4 - 40 min',
      description: 'An epic showdown between old rivals results in a fateful moment...',
      image: 'assets/img/wQEW3xLrQAThu1GvqpsKQyejrYS.jpg',
    },
    {
      title: 'The Base Violence Necessary for Change',
      episode: 'E5 - 40 min',
      description: 'An epic showdown between old rivals results in a fateful moment...An epic showdown between old rivals results in a fateful moment...',
      image: 'assets/img/wQEW3xLrQAThu1GvqpsKQyejrYS.jpg',
    },{
      title: 'The Base Violence Necessary for Change',
      episode: 'E3 - 40 min',
      description: 'An epic showdown between old rivals results in a fateful moment...',
      image: 'assets/img/wQEW3xLrQAThu1GvqpsKQyejrYS.jpg',
    },
    {
      title: 'The Base Violence Necessary for Change',
      episode: 'E4 - 40 min',
      description: 'An epic showdown between old rivals results in a fateful moment...',
      image: 'assets/img/wQEW3xLrQAThu1GvqpsKQyejrYS.jpg',
    },
    {
      title: 'The Base Violence Necessary for Change',
      episode: 'E5 - 40 min',
      description: 'An epic showdown between old rivals results in a fateful moment...An epic showdown between old rivals results in a fateful moment...',
      image: 'assets/img/wQEW3xLrQAThu1GvqpsKQyejrYS.jpg',
    },{
      title: 'The Base Violence Necessary for Change',
      episode: 'E3 - 40 min',
      description: 'An epic showdown between old rivals results in a fateful moment...',
      image: 'assets/img/wQEW3xLrQAThu1GvqpsKQyejrYS.jpg',
    },
    {
      title: 'The Base Violence Necessary for Change',
      episode: 'E4 - 40 min',
      description: 'An epic showdown between old rivals results in a fateful moment...',
      image: 'assets/img/wQEW3xLrQAThu1GvqpsKQyejrYS.jpg',
    },
    {
      title: 'The Base Violence Necessary for Change',
      episode: 'E5 - 40 min',
      description: 'An epic showdown between old rivals results in a fateful moment...An epic showdown between old rivals results in a fateful moment...',
      image: 'assets/img/wQEW3xLrQAThu1GvqpsKQyejrYS.jpg',
    }
  ];

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
  }

}
