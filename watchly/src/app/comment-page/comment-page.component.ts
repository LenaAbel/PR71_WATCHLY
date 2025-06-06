import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommentService } from '../services/comment.service';
import { Comment } from '../models/comment';
import {Router} from '@angular/router';
import { Utils } from '../utils';

@Component({
  selector: 'app-comment-page',
  templateUrl: './comment-page.component.html',
  styleUrls: ['./comment-page.component.css']
})
/**
 * Component to display comments for a specific show or user.
 * @param type - The type of the page (either "show" or "user").
 * @param showId - The ID of the show for which comments are displayed.
 * @param comments - Array of Comment objects representing the comments.
 * @param route - ActivatedRoute service to access route parameters.
 * @param commentService - CommentService to fetch comments from the server.
 * @param router - Router service to navigate between pages.
*/
export class CommentPageComponent implements OnInit {
  type!: string;
  showId!: number;
  comments: Comment[] = [];

  constructor(
    private route: ActivatedRoute,
    private commentService: CommentService,
    private router: Router
  ) {}

  ngOnInit(): void {
    if (this.route.snapshot.url[0].path !== 'user') {
      this.showId = Number(this.route.snapshot.paramMap.get('id'));
      this.type = 'show';
      this.loadComments();
    } else {
      this.type = this.route.snapshot.url[0].path;
    }
  }

  private loadComments() {
    if (this.showId) {
      this.commentService.getShowComments(this.showId).subscribe({
        next: (comments) => {
          this.comments = comments
        },
        error: (error) => {
          console.error('Error loading comments:', error)
          Utils.redirection404(this.router);
        }
      });
    }
  }
}
