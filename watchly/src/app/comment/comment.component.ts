import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Comment } from '../models/comment';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { marked } from 'marked';

@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.css']
})
/**
 * Component to display a comment with options to delete and toggle spoiler content.
 * @param page - The page where the comment is displayed.
 * @param isPage - Indicates if the comment is related to a page.
 * @param comment - The comment object containing the comment text and other details.
 * @param canDelete - Indicates if the user has permission to delete the comment.
 * @param deleteComment - Event emitter to notify when a comment is deleted.
 * @param showSpoilerContent - Indicates if the spoiler content should be shown.
 * @param parsedComment - The parsed HTML content of the comment.
 * @param sanitizer - Service to sanitize HTML content.
 */
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
