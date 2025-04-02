import { Component, OnInit, Input } from '@angular/core';
import { Comment } from '../models/comment';

@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.css']
})
export class CommentComponent implements OnInit {
  @Input() page!: string;
  @Input() isPage!: boolean;
  @Input() comment!: Comment;

  showSpoilerContent = false;

  constructor() { }

  ngOnInit(): void {
  }

  toggleSpoiler() {
    this.showSpoilerContent = !this.showSpoilerContent;
  }
}
