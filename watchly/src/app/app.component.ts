import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
/**
 * Main application component.
 * This component serves as the root of the application and handles routing events.
 * 
 */
export class AppComponent implements OnInit {
  title = 'watchly';

  currentRoute: string = ''; 

  constructor(private router: Router, private activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        const currentRoute = this.activatedRoute.firstChild?.snapshot.url[0]?.path || '';
        this.currentRoute = currentRoute; 
      }
    });
  }
}
