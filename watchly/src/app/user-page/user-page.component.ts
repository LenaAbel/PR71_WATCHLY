import { Component, OnInit, ViewChild } from '@angular/core';
import { SwiperComponent } from 'swiper/angular';
import Swiper, { Navigation, Pagination, Keyboard } from 'swiper';
import { Router } from '@angular/router';
import { AuthenticationService } from '../services/authentification.service';

@Component({
  selector: 'app-user-page',
  templateUrl: './user-page.component.html',
  styleUrls: ['./user-page.component.css']
})
export class UserPageComponent implements OnInit {
  @ViewChild(SwiperComponent, { static: false }) swiper?: SwiperComponent;
  firstname: string = '';
  lastname: string = '';
  username: string = '';

  constructor(
    private authService: AuthenticationService,
    private router: Router
  ) {}

  ngOnInit(): void {
    const userData = localStorage.getItem('userData');
    if (userData) {
      const user = JSON.parse(userData);
      this.firstname = user.firstname;
      this.lastname = user.lastname;
      this.username = user.username;
    }
  }

  slideNext() {
    this.swiper?.swiperRef.slideNext();
  }

  slidePrev() {
    this.swiper?.swiperRef.slidePrev();
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/']);
  }
}
