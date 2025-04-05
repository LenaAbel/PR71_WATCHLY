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
  profilePicture: string = '';

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
      this.username = user.username;
      this.firstname = user.firstname;
      this.lastname = user.lastname;

      // Fetch the profile picture from the backend
      this.authService.getUserPicture(user.id).subscribe({
        next: (response) => {
          this.profilePicture = response.profile_picture || 'assets/img/default-person.jpg';
          console.log('Fetched profile picture:', this.profilePicture);
        },
        error: (error) => {
          console.error('Error fetching profile picture:', error);
          this.profilePicture = 'assets/img/default-person.jpg';
        }
      });

      // Listen for changes in localStorage
      window.addEventListener('storage', (e) => {
        if (e.key === 'userData') {
          const updatedUser = JSON.parse(e.newValue || '{}');
          this.profilePicture = updatedUser.profile_picture || 'assets/img/default-person.jpg';
          console.log('Updated profile picture:', this.profilePicture);
        }
      });

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
    this.router.navigate(['/login']);
  }

  private loadUserComments(userId: number) {
    this.commentService.getUserComments(userId).subscribe({
      next: (comments) => {
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
