import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { WelcomeComponent } from './welcome/welcome.component';
import { SignupComponent } from './signup/signup.component';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgxWebstorageModule } from 'ngx-webstorage';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { ForumTileComponent } from './forum-tile/forum-tile.component';
import { ViewForumComponent } from './view-forum/view-forum.component';
import { PostTileComponent } from './post-tile/post-tile.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import {MatButtonModule} from '@angular/material/button';
import {MatDialogModule } from '@angular/material/dialog';
import { BrowserAnimationsModule, NoopAnimationsModule } from '@angular/platform-browser/animations';
import { VoteComponent } from './vote/vote.component';
import{ToastrModule} from 'ngx-toastr';
import { TokenInterceptor } from './token-interceptor';
import { CreatePostComponent } from './create-post/create-post.component';
import { CreateCommunityComponent } from './create-community/create-community.component';
import { ProfileComponent } from './profile/profile.component';
import { CommentTileComponent } from './comment-tile/comment-tile.component';
import { VoteCommentComponent } from './vote-comment/vote-comment.component';
import { ViewOtherProfileComponent } from './view-other-profile/view-other-profile.component';
import { ViewPostComponent } from './view-post/view-post.component';
@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    WelcomeComponent,
    SignupComponent,
    LoginComponent,
    HomeComponent,
    ForumTileComponent,
    ViewForumComponent,
    PostTileComponent,
    VoteComponent,
    CreatePostComponent,
    CreateCommunityComponent,
    ProfileComponent,
    CommentTileComponent,
    VoteCommentComponent,
    ViewOtherProfileComponent,
    ViewPostComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgxWebstorageModule.forRoot(),
    BrowserModule,
    FontAwesomeModule,
    MatButtonModule, 
    MatDialogModule,
    BrowserAnimationsModule,
    NoopAnimationsModule,
    ToastrModule.forRoot()
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent] 
})

export class AppModule {
 }
