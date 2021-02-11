import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CommentModel } from '../comment-tile/comment-model';
import { CommentPayload } from './comment-request-payload';

@Injectable({
  providedIn: 'root'
})
export class CommentService {

  constructor(private http:HttpClient) { }

  getCommentsByCurrentUser(): Observable<Array<CommentModel>>{
    return this.http.get<Array<CommentModel>>('http://localhost:8080/api/comments/user/currentUser');
  }
  getComment(id:number): Observable<CommentModel> {
    return this.http.get<CommentModel>('http://localhost:8080/api/comments/' + id)
  }
  getCommentsByUser(name:string): Observable<Array<CommentModel>>{
    return this.http.get<Array<CommentModel>>('http://localhost:8080/api/comments/user/' + name)
  }
  getCommentsByPost(id:number): Observable<Array<CommentModel>>{
    return this.http.get<Array<CommentModel>>('http://localhost:8080/api/comments/post/' + id)
  }
  createComment(commentRequest:CommentPayload) {
    return this.http.post('http://localhost:8080/api/comments/',commentRequest);
  }
}
