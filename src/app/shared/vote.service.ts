import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { VoteCommentPayload } from '../comment-tile/vote-comment-payload';
import { VotePayload } from '../post-tile/vote-payload';

@Injectable({
  providedIn: 'root'
})
export class VoteService {

  constructor(private http: HttpClient) { 
  }
  vote(votePayload: VotePayload): Observable<any> {
    return this.http.post('http://localhost:8080/api/votes', votePayload);
  }
  commentVote(votePayload:VoteCommentPayload):Observable<any> {
    return this.http.post('http://localhost:8080/api/votes/comment', votePayload);
  }
  getUserLogos(): Observable<number>{
    return this.http.get<number>('http://localhost:8080/api/votes/user/logos');
  }
  getUsersLogos(username:string): Observable<number>{
    return this.http.get<number>('http://localhost:8080/api/votes/user/logos/' + username);
  }
  getUserCreatedDate(): Observable<String>{
    return this.http.get<string>('http://localhost:8080/api/votes/user/joinDate');
  }
  getUsersCreatedDate(username:string): Observable<any>{
    return this.http.get('http://localhost:8080/api/votes/user/joinDate/' + username , {responseType: 'text'});
  }

}
