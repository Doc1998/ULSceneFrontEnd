import { EventEmitter, Injectable, Output } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { LocalStorageService,SessionStorageService } from 'ngx-webstorage';
import { SignupRequestPayLoad } from '../signup/signup-request.payload';
import { Observable, throwError } from 'rxjs';
import { LoginRequestPayLoad } from '../login/login.request.payload';
import { LoginResponse } from '../login/login-response.payload';
import {map, tap } from 'rxjs/operators';
import { UserResponse } from './user-response.payload';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  @Output() loggedIn: EventEmitter<boolean> = new EventEmitter();
  @Output() username: EventEmitter<string> = new EventEmitter();
  userN:string;
  refreshTokenPayload = {
    refreshToken: this.localStorage.retrieve('refreshToken'),
    username: this.localStorage.retrieve('username')
  }
  constructor(private httpClient : HttpClient,private localStorage: LocalStorageService) { }
  signup(signupRequestPayload: SignupRequestPayLoad): Observable<any>{
    return this.httpClient.post('http://localhost:8080/api/auth/signup', signupRequestPayload,{responseType: 'text'});
  }
  login(loginRequestPayload : LoginRequestPayLoad): Observable<boolean> {
    return this.httpClient.post<LoginResponse>('http://localhost:8080/api/auth/login',
      loginRequestPayload).pipe(map(data => {
        this.localStorage.store('jwt', data.jwt);
        this.localStorage.store('username', data.username);
        this.localStorage.store('refreshToken', data.refreshToken);
        this.localStorage.store('expiresAt', data.expiresAt);
        this.loggedIn.emit(true);
        this.username.emit(data.username);
        return true;
      }));
  }
  refreshToken() {
    return this.httpClient.post<LoginResponse>('http://localhost:8080/api/auth/refresh/token',
      this.refreshTokenPayload)
      .pipe(tap(response => {
        this.localStorage.clear('jwt');
        this.localStorage.clear('expiresAt');

        this.localStorage.store('jwt',
          response.jwt);
        this.localStorage.store('expiresAt', response.expiresAt);
      }));
  }
  getCurrentUser(): Observable<UserResponse>{
    return this.httpClient.get<UserResponse>('http://localhost:8080/api/auth/currentUser')
  }
 
  getUserName(){
    return this.localStorage.retrieve('username');
  }
  getRefreshToken(){
    return this.localStorage.retrieve('refreshToken');
  }
  getJwtToken(){
    return this.localStorage.retrieve('jwt');
  }
  isLoggedIn(): boolean {
    return this.getJwtToken() != null;
  }
  logout() {
    this.httpClient.post('http://localhost:8080/api/auth/logout', this.refreshTokenPayload,
      { responseType: 'text' })
      .subscribe(data => {
        console.log(data);
      }, error => {
        throwError(error);
      })
    this.localStorage.clear('jwt');
    this.localStorage.clear('username');
    this.localStorage.clear('refreshToken');
    this.localStorage.clear('expiresAt');
  }
}
