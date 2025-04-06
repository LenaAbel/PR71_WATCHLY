import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Content } from '../models/content';

@Component({
  selector: 'app-research-page',
  templateUrl: './research-page.component.html',
  styleUrls: ['./research-page.component.css']
})
export class ResearchPageComponent implements OnInit {

  searchQuery!: string;
  searchResults: Content[] = [];
  userFavorites: number[] = []; // Stocke les IDs des favoris de l'utilisateur
  userId: number = JSON.parse(localStorage.getItem('userData') || '{}').id;

  constructor(private route: ActivatedRoute, private httpClient: HttpClient) { }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.searchQuery = params['q'] || '';
      this.searchContent();
    });
  }

  searchContent(): void {
    console.log(`Searching for: ${this.searchQuery}`);
    
    if (this.searchQuery) {
      const endpoint = `http://localhost:3000/api/shows/search`;
      const options = { 
        params: { 
          name: this.searchQuery, 
        } 
      };

      this.httpClient.get<Content[]>(endpoint, options).subscribe({
        next: (response) => {
          this.searchResults = response;
          console.log(`Search results for query "${this.searchQuery}":`, response);
          if (this.searchResults.length > 0) {
            this.getUserFavorites(this.userId);
          }
        },
        error: (error) => {
          console.error('Error fetching search results:', error);
        }
      });
    }
  }

  getUserFavorites(id: number): void {
    console.log(`Fetching user favorites for ID: ${id}`);
    const endpoint = `http://localhost:3000/api/persons/id/${id}/favorites`;
  
    this.httpClient.get<any>(endpoint).subscribe({
      next: (response) => {
        console.log(`User favorites response:`, response);
  
        if (response.favorites && Array.isArray(response.favorites)) {
          this.userFavorites = response.favorites.map((fav: { show_id: number }) => fav.show_id); 
          console.log(`User favorites IDs:`, this.userFavorites);
  
          this.markFavorites(response.favorites);
        } else {
          console.warn('No favorites found in the response.');
        }
      },
      error: (error) => {
        console.error('Error fetching user favorites:', error);
      }
    });
  }

  markFavorites(favorites: Content[]): void {
    this.searchResults = this.searchResults.map(result => {
      const favorite = favorites.find(fav => fav.show_id === result.show_id);
  
      return {
        ...result,
        Favorite: favorite ? { ...favorite } : null
      };
    });
  
    console.log('Updated search results with favorites:', this.searchResults);
  }
}