import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
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
  @Input() canDelete: boolean = false;
  @Output() deleteComment = new EventEmitter<number>();

  showSpoilerContent = false;

  constructor() { }

  ngOnInit(): void {
  }

  toggleSpoiler() {
    this.showSpoilerContent = !this.showSpoilerContent;
  }

  onDelete() {
    if (this.comment.comment_id) {
      this.deleteComment.emit(this.comment.comment_id);
    }
  }
}
