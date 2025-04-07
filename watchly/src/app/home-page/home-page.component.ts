import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../services/authentification.service';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
/**
 * Component for the home page of the application.
 * It checks if the user is an admin and sets the isAdmin property accordingly.
 * @param isAdmin - Boolean indicating if the user is an admin.
 * @param authService - AuthenticationService to handle authentication-related tasks.
 */
export class HomePageComponent implements OnInit {
  isAdmin: boolean = false;

  constructor(private authService: AuthenticationService) { }

  ngOnInit(): void {
    const userData = JSON.parse(localStorage.getItem('userData') || '{}');
    this.isAdmin = userData?.is_admin === true;
  }

}
