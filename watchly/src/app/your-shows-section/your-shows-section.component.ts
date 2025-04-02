import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-your-shows-section',
  templateUrl: './your-shows-section.component.html',
  styleUrls: ['./your-shows-section.component.css']
})
export class YourShowsSectionComponent implements OnInit {

  selectedTab: string = 'movies'; // Default tab 'movies' or 'series'
  constructor() { }

  ngOnInit(): void {
  }

  selectTab(tab: string) {
    this.selectedTab = tab;
  }

  isSelected(tab: string): boolean {
    return this.selectedTab === tab;
  }
}
