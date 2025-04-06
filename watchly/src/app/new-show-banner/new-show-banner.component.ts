import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Content } from '../models/content';

@Component({
  selector: 'app-new-show-banner',
  templateUrl: './new-show-banner.component.html',
  styleUrls: ['./new-show-banner.component.css']
})
export class NewShowBannerComponent implements OnInit {

  newShow !: Content;
  picUrl !: string;

  constructor(private http : HttpClient) { }

  ngOnInit(): void {
    this.getNewShows();
  }

  getNewShows() {
    const endpoint = `http://localhost:3000/api/shows`;
    this.http.get<any[]>(endpoint).subscribe({
      next: (data: any[]) => {
        this.newShow = data[0]; // Récupère le premier show
  
        if (this.newShow && this.newShow.show_id) {
          this.getImageUrl(this.newShow.show_id); // Récupère l'image associée
        }
      },
      error: (err) => {
        console.error(`Error fetching shows:`, err);
      }
    });
  }

  getImageUrl(id: number): void {
    const endpoint = `http://localhost:3000/api/pictures/show/${id}`;
    this.http.get<any[]>(endpoint).subscribe({
      next: (data: any[]) => {
        if (data.length > 0) {
          this.picUrl = data[0].Picture.link;
        } else {
          console.warn(`No pictures found for show ID: ${id}`);
        }
      },
      error: (err) => {
        console.error(`Error fetching picture for show ID ${id}:`, err);
      }
    });
  }

}
