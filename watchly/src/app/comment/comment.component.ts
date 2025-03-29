import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.css']
})
export class CommentComponent implements OnInit {

  @Input() page!: string;
  @Input() spoiler!: boolean;
  @Input() isPage!: boolean;

  constructor() { }

  ngOnInit(): void {
  }

}
