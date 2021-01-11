import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { LocalStorageService,SessionStorageService } from 'ngx-webstorage';
import { SignupRequestPayLoad } from '../signup/signup-request.payload';
import { Observable } from 'rxjs';
import { LoginRequestPayLoad } from '../login/login.request.payload';
import { LoginResponse } from '../login/login-response.payload';
import {map, tap } from 'rxjs/operators';
import { UserResponse } from './user-response.payload';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  userN:string;
  refreshTokenPayload = {
    refreshToken: this.getRefreshToken(),
    username: this.getUserName()
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
        return true;
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
}
