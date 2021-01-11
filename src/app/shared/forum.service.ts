import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ForumModel } from '../forum-tile/forum-model';

@Injectable({
  providedIn: 'root'
})
export class ForumService {

  constructor(private http:HttpClient) { 
  }

  getAllForums(): Observable<Array<ForumModel>>{
    return this.http.get<Array<ForumModel>>('http://localhost:8080/api/forum');
  }
  getForumById(id:number): Observable<Array<ForumModel>>{
    return this.http.get<Array<ForumModel>>('http://localhost:8080/api/forum/' + id);
  }
}
