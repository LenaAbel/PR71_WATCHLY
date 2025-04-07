import { Component, OnInit, Input } from '@angular/core';
import { CommentService } from '../services/comment.service';
import { Comment } from '../models/comment';
import { AuthenticationService } from '../services/authentification.service';

@Component({
  selector: 'app-comment-section',
  templateUrl: './comment-section.component.html',
  styleUrls: ['./comment-section.component.css']
})
/**
 * Component to display a section for adding and viewing comments.
 * @param showId - The ID of the show for which comments are displayed.
 * @param comments - Array of Comment objects representing the comments.
 * @param newComment - Object representing a new comment to be added.
 * @param errorMessage - Error message to be displayed in case of an error.
 * @param successMessage - Success message to be displayed after a successful comment submission.
 * @param commentService - Service to manage comments.
 * @param authService - Service to manage authentication.
 */
export class CommentSectionComponent implements OnInit {
  @Input() showId!: number;
  comments: Comment[] = [];
  newComment: Partial<Comment> = {
    comment_text: '',
    is_spoiler: false
  };
  errorMessage: string | null = null;
  successMessage: string | null = null;

  constructor(
    private commentService: CommentService,
    private authService: AuthenticationService
  ) {}

  ngOnInit(): void {
    this.loadComments();
  }

  private loadComments() {
    if (this.showId) {
      this.commentService.getShowComments(this.showId).subscribe({
        next: (comments) => {
          this.comments = comments;
        },
        error: (error) => {
          console.error('Error loading comments:', error);
          this.comments = [];
        }
      });
    } else {
      console.warn('No showId provided to comment section');
    }
  }

  addMarkdown(markup: string) {
    const textarea = document.querySelector('textarea[name="comment_text"]') as HTMLTextAreaElement;
    if (!textarea) return;

    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const text = this.newComment.comment_text || '';
    
    const before = text.substring(0, start);
    const selection = text.substring(start, end);
    const after = text.substring(end);

    const content = selection || 'text';
    this.newComment.comment_text = before + markup + content + markup + after;
    
    // Reset cursor position
    setTimeout(() => {
      textarea.focus();
      const newCursorPos = start + markup.length + content.length;
      textarea.setSelectionRange(newCursorPos, newCursorPos);
    }, 0);
  }

  onSubmitComment() {
    this.errorMessage = null;
    this.successMessage = null;

    if (!this.newComment.comment_text?.trim()) {
      this.errorMessage = "Comment cannot be empty";
      return;
    }

    if (!this.authService.isLoggedIn()) {
      this.errorMessage = "Please login to post a comment";
      return;
    }

    const userData = JSON.parse(localStorage.getItem('userData') || '{}');

    if (!userData.id) {
      this.errorMessage = "Session expired. Please login again";
      return;
    }

    const comment: Partial<Comment> = {
      comment_text: this.newComment.comment_text.trim(),
      show_id: this.showId,
      person_id: userData.id,
      is_spoiler: this.newComment.is_spoiler || false,
      comment_date: new Date().toISOString(),
      is_watched: true,
      username: userData.username
    };


    this.commentService.addComment(comment).subscribe({
      next: (response) => {
        this.comments.unshift(response);
        this.newComment.comment_text = '';
        this.newComment.is_spoiler = false;
        this.successMessage = "Comment posted successfully!";
        setTimeout(() => this.successMessage = null, 3000);
      },
      error: (error) => {
        console.error('Error posting comment:', error);
        if (error.status === 400) {
          this.errorMessage = "Unable to post comment. Please try logging in again.";
        } else if (error.status === 401) {
          this.errorMessage = "Your session has expired. Please login again.";
        } else {
          this.errorMessage = "An error occurred while posting your comment. Please try again.";
        }
      }
    });
  }
}
