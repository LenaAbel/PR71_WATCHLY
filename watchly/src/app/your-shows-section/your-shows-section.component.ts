import { Component, OnInit } from '@angular/core';
import { Content } from '../models/content';
import { ShowsService } from '../services/shows.service';

@Component({
  selector: 'app-your-shows-section',
  templateUrl: './your-shows-section.component.html',
  styleUrls: ['./your-shows-section.component.css']
})
export class YourShowsSectionComponent implements OnInit {

  selectedTab: string = 'movies'; // Default tab 'movies' or 'series'
  movies: Content[] = [];
  series: Content[] = [];
  content: Content[] = [];
  constructor(private showsService: ShowsService) {}

  async ngOnInit(): Promise<void> {
      await this.showsService.initializeContent();
      this.movies = this.showsService.getDisplayedMovies();
      this.series = this.showsService.getDisplayedSeries();
      this.content = this.movies;
  }

  selectTab(tab: string) {
    this.selectedTab = tab;
    this.selectedTab === 'movies' ? this.content = this.movies : this.content = this.series;
  }

  isSelected(tab: string): boolean {
    return this.selectedTab === tab;
  }
}
