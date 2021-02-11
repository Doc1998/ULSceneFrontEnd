import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { PostRequestPayload } from '../create-post/post.request.payload';
import { PostModel } from '../post-tile/post-model';

@Injectable({
  providedIn: 'root'
})
export class PostService {

  constructor(private http:HttpClient) { }

  getPostsByForumName(name:string): Observable<Array<PostModel>>{
    return this.http.get<Array<PostModel>>('http://localhost:8080/api/posts/by-Forum-name/' + name);
  }
  getPostsByUser(username:string): Observable<Array<PostModel>>{
    return this.http.get<Array<PostModel>>('http://localhost:8080/api/posts/by-user/' + username);
  }
  getPostsByCurrentUser(): Observable<Array<PostModel>>{
    return this.http.get<Array<PostModel>>('http://localhost:8080/api/posts/currentUser');
  }
  getPost(id: number): Observable<PostModel> {
    return this.http.get<PostModel>('http://localhost:8080/api/posts/id/' + id);
  }
  createPost(postRequest:PostRequestPayload) {
    return this.http.post('http://localhost:8080/api/posts/',postRequest);
  }

}
