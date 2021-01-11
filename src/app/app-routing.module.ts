import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { AuthGuard } from './shared/auth.guard';
import { LoggedGuard } from './shared/logged.guard';
import { SignupComponent } from './signup/signup.component';
import { ViewForumComponent } from './view-forum/view-forum.component';
import { WelcomeComponent } from './welcome/welcome.component';

const routes: Routes = [
  {path:'',component:WelcomeComponent,canActivate:[LoggedGuard]},
  {path:'sign-up',component:SignupComponent},
  {path:'login',component:LoginComponent},
  {path:'home',component:HomeComponent,canActivate:[AuthGuard]},
  {path:'forum/:name',component:ViewForumComponent,canActivate:[AuthGuard]}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [
    AuthGuard,
    LoggedGuard
  ]
})
export class AppRoutingModule { }
