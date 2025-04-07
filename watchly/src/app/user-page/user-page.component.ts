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
/**
 * Component to display user information and comments.
 * @param firstname - User's first name.
 * @param lastname - User's last name.
 * @param username - User's username.
 * @param profilePicture - User's profile picture URL.
 * @param comments - Array of Comment objects representing the user's comments.
 * @param successMessage - Message to display after successfully deleting a comment.
 * @param shows - Array of Content objects representing the user's favorite shows.
 * @param allShows - Array of all shows fetched from the server.
 * @param swiperRef - Reference to the Swiper instance for navigation.
 * @param currentFilter - Current filter applied to the shows ('all', 'movies', or 'series').
 * @param searchQuery - Search query for filtering shows.
 */
export class UserPageComponent implements OnInit {
  @ViewChild(SwiperComponent, { static: false }) swiper?: SwiperComponent;
  firstname: string = '';
  lastname: string = '';
  username: string = '';
  profilePicture: string = '';
  isAdmin: boolean = false;

  comments: Comment[] = [];
  successMessage: string | null = null;
  favoriteSuccessMessage: string | null = null;
  shows: Content[] = [];
  allShows: Content[] = []; 
  swiperRef: Swiper | undefined;

  currentFilter: 'all' | 'movies' | 'series' = 'all';
  searchQuery: string = '';

  // Admin statistics
  statistics: any = {
    userCount: 0,
    showCount: 0,
    commentCount: 0,
    favoriteCount: 0,
    moviesCount: 0,
    seriesCount: 0,
    popularShows: [],
    recentComments: []
  };

  // Add a success message for admin actions
  adminActionMessage: string | null = null;

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
      this.isAdmin = user.is_admin === true;

      // Listen for changes in localStorage
      window.addEventListener('storage', (e) => {
        if (e.key === 'userData') {
          const updatedUser = JSON.parse(e.newValue || '{}');
          this.profilePicture = updatedUser.profile_picture || 'assets/img/default-person.jpg';
        }
      });

      const userId = user.id; 
      
      if (this.isAdmin) {
        // Load admin statistics
        this.loadAdminStatistics();
      } else {
        // Load regular user data
        this.loadUserComments(userId);
        this.getPerson(userId);
      }
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
        // Ensure is_movie is a proper boolean
        this.allShows = data.shows.map(show => ({
          ...show,
          is_movie: Boolean(show.is_movie) 
        }));
        
        this.shows = [...this.allShows]; // Initialize shows with all shows
        this.filterShows();
        
        // Debug logging
      },
      error: (err) => {
        console.error(`Error fetching person with id ${id}:`, err);
        this.allShows = [];
        this.shows = [];
      }
    });
  }

  filterShows() {
    // Always start filtering from the original dataset
    let filtered = [...this.allShows];
    
    // Apply type filter with improved boolean handling
    if (this.currentFilter !== 'all') {
      filtered = filtered.filter(show => {
        if (this.currentFilter === 'movies') {
          return Boolean(show.is_movie) === true;
        } else {
          return Boolean(show.is_movie) === false;
        }
      });
    }
    
    // Apply search filter
    if (this.searchQuery.trim()) {
      const query = this.searchQuery.toLowerCase();
      filtered = filtered.filter(show => 
        show.name.toLowerCase().includes(query)
      );
    }
    
    this.shows = filtered;
    
    // Debug log after filtering
    // console.log(`Filter applied: ${this.currentFilter}, Results: ${filtered.length}`);
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

  // Handle favorite deletion alert
  handleFavoriteDeleted(showName: string) {
    this.favoriteSuccessMessage = `"${showName}" removed from favorites`;
    // Refresh the favorites list
    const userData = localStorage.getItem('userData');
    if (userData) {
      const user = JSON.parse(userData);
      this.getPerson(user.id);
    }
    // Auto-hide the message after 3 seconds
    setTimeout(() => {
      this.favoriteSuccessMessage = null;
    }, 3000);
  }

  // New method to load admin statistics
  loadAdminStatistics() {
    this.http.get<any>('http://localhost:3000/api/admin/statistics').subscribe({
      next: (data) => {
        this.statistics = data;
      },
      error: (error) => {
        console.error('Error loading admin statistics:', error);
      }
    });
  }

  // New method to delete a comment as admin
  adminDeleteComment(commentId: number) {
    this.http.delete<any>(`http://localhost:3000/api/admin/comments/${commentId}`).subscribe({
      next: () => {
        // Remove the deleted comment from the list
        this.statistics.recentComments = this.statistics.recentComments.filter(
          (comment: any) => comment.comment_id !== commentId
        );
        
        // Update the comment count in statistics
        this.statistics.commentCount = Math.max(0, this.statistics.commentCount - 1);
        
        // Show success message
        this.adminActionMessage = "Comment deleted successfully!";
        setTimeout(() => {
          this.adminActionMessage = null;
        }, 3000);
      },
      error: (error) => {
        console.error('Error deleting comment:', error);
      }
    });
  }
}
