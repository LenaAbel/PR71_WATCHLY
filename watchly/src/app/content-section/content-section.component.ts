import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-content-section',
  templateUrl: './content-section.component.html',
  styleUrls: ['./content-section.component.css']
})
export class ContentSectionComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }
  content = {
    title: 'Arcane',
    status: 'Ongoing',
    year: 2021,
    seasons: 2,
    episodes: 18,
    duration: '40 min',
    language: 'English',
    description: `The delicate balance between the rich city of Piltover and the seedy underbelly of Zaun. Tensions between these city-states boil over with the creation of "hextech", a way for any person to control magical energy in Piltover, and in Zaun, a new drug called "shimmer" transforms humans into monsters...The delicate balance between the rich city of Piltover and the seedy underbelly of Zaun. Tensions between these city-states boil over with the creation of "hextech", a way for any person to control magical energy in Piltover, and in Zaun, a new drug called "shimmer" transforms humans into monsters...The delicate balance between the rich city of Piltover and the seedy underbelly of Zaun. Tensions between these city-states boil over with the creation of "hextech", a way for any person to control magical energy in Piltover, and in Zaun, a new drug called "shimmer" transforms humans into monsters...The delicate balance between the rich city of Piltover and the seedy underbelly of Zaun. Tensions between these city-states boil over with the creation of "hextech", a way for any person to control magical energy in Piltover, and in Zaun, a new drug called "shimmer" transforms humans into monsters...The delicate balance between the rich city of Piltover and the seedy underbelly of Zaun. Tensions between these city-states boil over with the creation of "hextech", a way for any person to control magical energy in Piltover, and in Zaun, a new drug called "shimmer" transforms humans into monsters...`,
    imageUrl: 'assets/arcane.jpg', // Replace with your image path
    rating: 4, // 1-5 scale
    genres: ['Action', 'Adventure', 'Animation', 'Drama', 'Fantasy']
  };

}
