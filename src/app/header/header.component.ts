import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../shared/auth.service';
import { faUser} from '@fortawesome/free-regular-svg-icons';
import { UserNameModel } from '../profile/userNameModel';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  isLoggedIn: boolean;
  username: UserNameModel;
  faUser = faUser;
  constructor(private authService: AuthService, private router: Router) {

   }

  ngOnInit(): void {
    this.authService.loggedIn.subscribe((data: boolean) => this.isLoggedIn = data);
    console.log(this.isLoggedIn +'1')
    this.authService.checkUserBanned().subscribe((data: boolean) => this.isLoggedIn = data);
    console.log(this.isLoggedIn +'2')
    //this.isLoggedIn = this.authService.isLoggedIn();
    console.log(this.isLoggedIn +'3')
    console.log(this.authService.checkUserBanned() + 'okokok')
    this.authService.getUserName().subscribe(data => {
      this.username = data
    })
   
  }
  logout(){
    this.authService.logout();
    this.isLoggedIn = false;
    this.router.navigateByUrl('');
  }

}
