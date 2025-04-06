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
  result !: Content;
  constructor(private route: ActivatedRoute, private httpClient : HttpClient ) { }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.searchQuery = params['q'] || '';
    });
    this.searchContent();
  }

  ngOnChanges(): void {
    this.route.queryParams.subscribe(params => {
      this.searchQuery = params['q'] || '';
    });
    this.searchContent();
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
        },
        error: (error) => {
          console.error('Error fetching search results:', error);
        }
      });
    }
  }



}
