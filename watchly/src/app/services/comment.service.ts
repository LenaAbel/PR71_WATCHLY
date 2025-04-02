import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Comment } from '../models/comment';
import { environment } from '../../environments/environment';


@Injectable({
  providedIn: 'root'
})

export class CommentService {
  private apiUrl = `http://localhost:3000/api/comments`;
  
  constructor(private http: HttpClient) { }

  getShowComments(showId: number): Observable<Comment[]> {
    return this.http.get<Comment[]>(`${this.apiUrl}/show/${showId}`);
  }

  getUserComments(userId: number): Observable<Comment[]> {
    return this.http.get<Comment[]>(`${this.apiUrl}/user/${userId}`);
  }

  addComment(comment: Partial<Comment>): Observable<Comment> {
    return this.http.post<Comment>(`${this.apiUrl}`, comment);
  }

  deleteComment(commentId: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${commentId}`);
  }
}
