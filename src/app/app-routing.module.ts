import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CreateCommunityComponent } from './create-community/create-community.component';
import { CreateForumPostComponent } from './create-forum-post/create-forum-post.component';
import { CreatePostComponent } from './create-post/create-post.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { ProfileComponent } from './profile/profile.component';
import { AuthGuard } from './shared/auth.guard';
import { LoggedGuard } from './shared/logged.guard';
import { SignupComponent } from './signup/signup.component';
import { ViewForumComponent } from './view-forum/view-forum.component';
import { ViewOtherProfileComponent } from './view-other-profile/view-other-profile.component';
import { ViewPostComponent } from './view-post/view-post.component';
import { WelcomeComponent } from './welcome/welcome.component';

const routes: Routes = [
  {path:'',component:WelcomeComponent,canActivate:[LoggedGuard]},
  {path:'sign-up',component:SignupComponent},
  {path:'login',component:LoginComponent},
  {path:'home',component:HomeComponent,canActivate:[AuthGuard]},
  {path:'forum/:name',component:ViewForumComponent,canActivate:[AuthGuard]},
  {path:'create-forum',component:CreateCommunityComponent,canActivate:[AuthGuard]},
  {path:'create-post',component:CreatePostComponent,canActivate:[AuthGuard]},
  {path:'profile',component:ProfileComponent,canActivate:[AuthGuard]},
  {path:'users/:user',component:ViewOtherProfileComponent,canActivate:[AuthGuard]},
  {path:'posts/:id',component:ViewPostComponent,canActivate:[AuthGuard]},
  {path:'forum/:name/createPost',component:CreateForumPostComponent,canActivate:[AuthGuard]},

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
