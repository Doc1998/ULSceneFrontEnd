import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ForumRequestPayload } from '../create-community/forum.request.payload';
import { ForumModel } from '../forum-tile/forum-model';
import { JoinForumRequestPayload } from '../forum-tile/joinForum.request.payload';
import { UserModel } from './user-model';

@Injectable({
  providedIn: 'root'
})
export class ForumService {

  constructor(private http:HttpClient) { 
  }

  getAllForums(): Observable<Array<ForumModel>>{
    return this.http.get<Array<ForumModel>>('http://localhost:8080/api/forum/');
  }
  getAllByPopularity(): Observable<Array<ForumModel>>{
    return this.http.get<Array<ForumModel>>('http://localhost:8080/api/forum/mostPopular');
  }
  getAllByActive(): Observable<Array<ForumModel>>{
    return this.http.get<Array<ForumModel>>('http://localhost:8080/api/forum/mostActive');
  }
  getForumById(id:number): Observable<Array<ForumModel>>{
    return this.http.get<Array<ForumModel>>('http://localhost:8080/api/forum/' + id );
  }
  getForumByName(name:string): Observable<ForumModel>{
    return this.http.get<ForumModel>('http://localhost:8080/api/forum/by-name/' + name );
  }
  createForum(forumRequest:ForumRequestPayload):Observable<any>{
    return this.http.post('http://localhost:8080/api/forum/',forumRequest ,{responseType: 'text'});
  }
  checkMembership(name:string):Observable<boolean>{
    return this.http.get<boolean>('http://localhost:8080/api/forum/checkMembership/' + name );
  }
  getForumModerators(name:string):Observable<Array<UserModel>>{
    return this.http.get<Array<UserModel>>('http://localhost:8080/api/forum/' + name + '/mods');
  }
  getForumUsers(name:string):Observable<Array<UserModel>>{
    return this.http.get<Array<UserModel>>('http://localhost:8080/api/forum/' + name + '/users');
  }
  joinForum(JoinForumRequestPayload: JoinForumRequestPayload):Observable<any>{
    return this.http.post('http://localhost:8080/api/forum/join',JoinForumRequestPayload);
  }
  leaveForum(JoinForumRequestPayload: JoinForumRequestPayload):Observable<any>{
    return this.http.post('http://localhost:8080/api/forum/leave',JoinForumRequestPayload);
  }
  
}
