import { Component, OnInit, ViewChild } from '@angular/core';
import { SwiperComponent } from 'swiper/angular';
import Swiper, { Navigation, Pagination, Keyboard } from 'swiper';
import { Router } from '@angular/router';
import { AuthenticationService } from '../services/authentification.service';
import { CommentService } from '../services/comment.service';
import { Comment } from '../models/comment';

@Component({
  selector: 'app-user-page',
  templateUrl: './user-page.component.html',
  styleUrls: ['./user-page.component.css']
})
export class UserPageComponent implements OnInit {
  @ViewChild(SwiperComponent, { static: false }) swiper?: SwiperComponent;
  firstname: string = '';
  lastname: string = '';
  username: string = '';
  comments: Comment[] = [];
  successMessage: string | null = null;

  constructor(
    private authService: AuthenticationService,
    private router: Router,
    private commentService: CommentService
  ) {}

  ngOnInit(): void {
    const userData = localStorage.getItem('userData');
    if (userData) {
      const user = JSON.parse(userData);
      this.firstname = user.firstname;
      this.lastname = user.lastname;
      this.username = user.username;
      const userId = user.id; 
      this.loadUserComments(userId);
    }
  }

  slideNext() {
    this.swiper?.swiperRef.slideNext();
  }

  slidePrev() {
    this.swiper?.swiperRef.slidePrev();
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/']);
  }

  private loadUserComments(userId: number) {
    this.commentService.getUserComments(userId).subscribe({
      next: (comments) => {
        console.log('User comments loaded:', comments);
        this.comments = comments;
      },
      error: (error) => {
        console.error('Error loading user comments:', error);
        this.comments = [];
      }
    });
  }

  deleteComment(commentId: number) {
    this.commentService.deleteComment(commentId).subscribe({
      next: () => {
        this.comments = this.comments.filter(c => c.comment_id !== commentId);
        this.successMessage = "Comment deleted successfully!";
        setTimeout(() => this.successMessage = null, 3000); // Hide after 3 seconds
      },
      error: (error) => {
        console.error('Error deleting comment:', error);
      }
    });
  }
}
