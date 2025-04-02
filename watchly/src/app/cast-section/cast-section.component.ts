import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-cast-section',
  templateUrl: './cast-section.component.html',
  styleUrls: ['./cast-section.component.css']
})
export class CastSectionComponent implements OnInit {
  @Input() cast: any[] = []; 
  constructor() { }

  ngOnInit(): void {
    console.log('CastSectionComponent initialized');
    console.log('Cast:', this.cast);
  }

}
