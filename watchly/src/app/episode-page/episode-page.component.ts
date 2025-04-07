import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { Utils } from '../utils';

@Component({
  selector: 'app-episode-page',
  templateUrl: './episode-page.component.html',
  styleUrls: ['./episode-page.component.css']
})
export class EpisodePageComponent implements OnInit {
  episodes!: any[];
  groupedSeasons!: any[];;
  showId!: number;
  constructor(private router: Router, private http: HttpClient, private route: ActivatedRoute) { }

  ngOnInit(): void {
    const type = 'series';
    const id = 102;
    this.showId = Number(this.route.snapshot.paramMap.get('id'));
    this.getEpisodes(id);
  }
  // Fetch episodes and group them by season
  getEpisodes(id: number): void {
    const endpoint = `http://localhost:3000/api/episodes/${this.showId}/episodes`;
    this.http.get<any[]>(endpoint).subscribe({
      next: (data: any[]) => {
        this.episodes = data;
        
        this.groupSeasons();
        
        if(this.episodes.length === 0) {
          this.router.navigate(['/error/404']);
        }

      },
      error: (err) => {
        console.error(`Error fetching with id ${id}:`, err);
        Utils.redirection404(this.router);
      }
    });
  }

  groupSeasons(): void {
    const seasonGroups = this.episodes.reduce((acc: any, episode: any) => {
      const seasonNumber = episode.season;
  
      if (!acc[seasonNumber]) {
        acc[seasonNumber] = [];
      }
  
      acc[seasonNumber].push(episode);
      return acc;
    }, {});
  
    this.groupedSeasons = Object.keys(seasonGroups).map(seasonNumber => ({
      seasonNumber: seasonNumber,
      episodes: seasonGroups[seasonNumber],
    }));
  }
}
