import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-trailer-banner',
  templateUrl: './trailer-banner.component.html',
  styleUrls: ['./trailer-banner.component.css']
})
export class TrailerBannerComponent implements OnInit {

  constructor() { }

  controls(e : Event): void {
    const video = e.target as HTMLVideoElement;
    if (video && video.paused) {
      video.play();
    } else if (video) {
      video.pause();
    }
  }

  ngOnInit(): void {
  }

}
