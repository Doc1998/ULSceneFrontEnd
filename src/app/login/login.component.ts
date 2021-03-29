import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../shared/auth.service';
import { LoginRequestPayLoad } from './login.request.payload';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  isError: boolean;
  isBanned:boolean
  loginRequestPayload : LoginRequestPayLoad;
  registerSuccessMessage: string;
  constructor(private authService: AuthService,private activatedRoute: ActivatedRoute,private router: Router,private toastr:ToastrService) {
    this.loginRequestPayload = {
      username: '',
      password: ''
    };
    this.isBanned = false;
  }

  ngOnInit(): void {
    this.loginForm = new FormGroup({
      username: new FormControl('',Validators.required),
      password: new FormControl('',Validators.required)
    })
    this.activatedRoute.queryParams
      .subscribe(params => {
        if (params.registered !== undefined && params.registered === 'true') {
          this.toastr.success('Signup Successful');
          this.registerSuccessMessage = 'Please Check your inbox for activation email '
            + 'activate your account before you Login!';
        }
      });
  }
  login(){
    this.loginRequestPayload.username = this.loginForm.get('username').value;
    this.loginRequestPayload.password = this.loginForm.get('password').value;
    this.authService.checkBanned(this.loginRequestPayload.username).subscribe((data: boolean) => this.isBanned = data);
    console.log(this.isBanned)

    //subscribe to the response we recieve from the authservice, if successful navigate to ("/")
    // if error, we set is error to true and our html will display a message
    this.authService.login(this.loginRequestPayload).subscribe(data => {
      this.isError = false;
      if(this.isBanned){
        console.log(this.authService.checkBanned(this.loginRequestPayload.username)) 
        this.authService.logout()
        this.router.navigateByUrl('');
        this.toastr.warning('Banned users cannot login');
      }else{
        this.router.navigateByUrl('home');
        this.toastr.success('Login Successful');
      }
  }, error => {
    this.toastr.error("Error");
    console.log('???Now')
  })
}
isBannedUser(name:string){
  this.authService.checkBanned(name).subscribe(data => {
    this.isBanned = data;
  })
}

}
