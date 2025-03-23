import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-show-page',
  templateUrl: './show-page.component.html',
  styleUrls: ['./show-page.component.css']
})
export class ShowPageComponent implements OnInit {
  showId!: number;
  type!: string;

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.showId = Number(this.route.snapshot.paramMap.get('id'));
    this.type = this.route.snapshot.url[0].path;
  }

}
