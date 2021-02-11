import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ValidatorFn, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../shared/auth.service';
import { SignupRequestPayLoad } from './signup-request.payload';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  signupRequestPayload: SignupRequestPayLoad;
  signupForm: FormGroup;
  valid:string;

  constructor(private authService: AuthService,private router: Router,private toastr:ToastrService) {
    this.signupRequestPayload = {
      username : '',
      email: '',
      password: ''
    }

   }

  ngOnInit(): void {
    this.signupForm = new FormGroup({
      username: new FormControl('',Validators.required),
      email: new FormControl('',[Validators.required,Validators.email]),
      password: new FormControl('',[Validators.required,Validators.minLength(6)])
    })
  }

  signup(){
    this.signupRequestPayload.email = this.signupForm.get('email').value;
    this.signupRequestPayload.username = this.signupForm.get('username').value;
    this.signupRequestPayload.password = this.signupForm.get('password').value;

    this.authService.signup(this.signupRequestPayload).subscribe(data => {
      this.router.navigate(['login'],
        { queryParams: { registered: 'true' } });

    }, error => {
      this.toastr.error('Registration failed, username or email may already exist');
    });

  }
  isUlMail(): ValidatorFn{
    return (control: AbstractControl): { [key: string]: any; } => {
      this.signupRequestPayload.email = this.valid;
      if (this.signupRequestPayload.email.includes("@studentmail.ul.ie")) {
        return null;
      }
      return {'incorrect': true};
    };
}

}
