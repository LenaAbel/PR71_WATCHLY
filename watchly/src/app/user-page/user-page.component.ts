import { Component, OnInit, ViewChild } from '@angular/core';
import { SwiperComponent } from 'swiper/angular';
import Swiper, { Navigation, Pagination, Keyboard } from 'swiper';
import { Router } from '@angular/router';
import { AuthenticationService } from '../services/authentification.service';
import { CommentService } from '../services/comment.service';
import { Comment } from '../models/comment';
import { HttpClient } from '@angular/common/http';
import { Content } from '../models/content';

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
  shows: Content[] = [];
  swiperRef: Swiper | undefined;

  currentFilter: 'all' | 'movies' | 'series' = 'all';
  searchQuery: string = '';

  constructor(
    private authService: AuthenticationService,
    private router: Router,
    private commentService: CommentService,
    private http: HttpClient
  ) {}

  ngOnInit(): void {
    const userData = localStorage.getItem('userData');
    if (userData) {
      const user = JSON.parse(userData);
      this.username = user.username;
      this.firstname = user.firstname;
      this.lastname = user.lastname;
      this.profilePicture = user.profile_picture || 'assets/img/default-person.jpg';

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
      this.getPerson(userId)

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


  getPerson(id: number) {
    const endpoint = `http://localhost:3000/api/persons/id/${id}`;
    this.http.get<{ shows: Content[] }>(endpoint).subscribe({
      next: (data) => {
        this.shows = data.shows;
        console.log(this.shows);
        this.filterShows();
        console.log(`Fetched person with id ${id}:`, data);
      },
      error: (err) => {
        console.error(`Error fetching person with id ${id}:`, err);
      }
    });
  }

  filterShows() {
    let filtered = [...this.shows];
    
    // Apply type filter
    if (this.currentFilter !== 'all') {
      filtered = filtered.filter(show => 
        this.currentFilter === 'movies' ? show.is_movie : !show.is_movie
      );
    }
    
    // Apply search filter
    if (this.searchQuery.trim()) {
      const query = this.searchQuery.toLowerCase();
      filtered = filtered.filter(show => 
        show.name.toLowerCase().includes(query)
      );
    }
    
    this.shows = filtered;
  }

  onFilterChange(filter: 'all' | 'movies' | 'series') {
    this.currentFilter = filter;
    this.filterShows();
  }

  onSearch(event: Event) {
    this.searchQuery = (event.target as HTMLInputElement).value;
    this.filterShows();
  }

  onSwiper(swiper: Swiper) {
    this.swiperRef = swiper;
  }
}
