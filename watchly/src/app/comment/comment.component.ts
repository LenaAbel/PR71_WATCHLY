import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Comment } from '../models/comment';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { marked } from 'marked';

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
  parsedComment: SafeHtml = '';

  constructor(private sanitizer: DomSanitizer) {
    // Configure marked options for safety
    marked.setOptions({
      breaks: true,
      gfm: true,
      pedantic: false,
      sanitize: true
    });
  }

  ngOnInit(): void {
    // Parse markdown when component initializes
    this.parseMarkdown();
  }

  toggleSpoiler() {
    this.showSpoilerContent = !this.showSpoilerContent;
  }

  onDelete() {
    if (this.comment.comment_id) {
      this.deleteComment.emit(this.comment.comment_id);
    }
  }

  private parseMarkdown(): void {
    if (this.comment?.comment_text) {
      const rawHtml = marked(this.comment.comment_text);
      if (typeof rawHtml === 'string') {
        this.parsedComment = this.sanitizer.bypassSecurityTrustHtml(rawHtml);
      }
    }
  }
}
