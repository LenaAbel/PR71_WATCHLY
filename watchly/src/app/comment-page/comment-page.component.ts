import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-comment-page',
  templateUrl: './comment-page.component.html',
  styleUrls: ['./comment-page.component.css']
})
export class CommentPageComponent implements OnInit {
  type!: string;
  showId!: number;

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    console.log(this.route.snapshot.url);
    if (this.route.snapshot.url[0].path !== 'user'){
      this.showId = Number(this.route.snapshot.paramMap.get('id'));
      this.type = 'show';
    }
    else{
      this.type = this.route.snapshot.url[0].path;
    }
  }

}
