import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { WelcomeComponent } from './welcome/welcome.component';
import { SignupComponent } from './signup/signup.component';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { NgxWebstorageModule } from 'ngx-webstorage';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { ForumTileComponent } from './forum-tile/forum-tile.component';
import { ViewForumComponent } from './view-forum/view-forum.component';
import { PostTileComponent } from './post-tile/post-tile.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import {MatButtonModule} from '@angular/material/button';
import {MatDialogModule } from '@angular/material/dialog';
import { DialogCompComponent } from './dialog-comp/dialog-comp.component';
import { BrowserAnimationsModule, NoopAnimationsModule } from '@angular/platform-browser/animations';
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
    DialogCompComponent
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
    NoopAnimationsModule
  ],
  providers: [],
  bootstrap: [AppComponent] 
})

export class AppModule {
 }
