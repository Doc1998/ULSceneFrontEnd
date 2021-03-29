import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CommentModel } from '../comment-tile/comment-model';
import { PostModel } from '../post-tile/post-model';
import { AuthService } from '../shared/auth.service';
import { CommentService } from '../shared/comment.service';
import { ForumService } from '../shared/forum.service';
import { PostService } from '../shared/post.service';
import { UserModel } from '../shared/user-model';
import { UserResponse } from '../shared/user-response.payload';
import { VoteService } from '../shared/vote.service';
import { UserNameModel } from './userNameModel';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  viewPosts:boolean;
  comments : Array<CommentModel>;
  viewComments:boolean;
  posts : Array<PostModel>;
  joinDate: String;
  logos:number;
  name:string;
  isAdmin:boolean;
  user:UserModel;
  noPosts:boolean;
  noComments:boolean;
    constructor(private router: Router,private forumService:ForumService,private toastr:ToastrService,private postService: PostService,private commentService:CommentService,private authService:AuthService,private voteService:VoteService) { 
      this.noComments = false;
      this.noPosts = false;

  }

  ngOnInit(): void {
    this.authService.getCurrentUser().subscribe(user => {
      this.name = user.username;
      this.user = user;
      this.voteService.getUsersLogos(this.name).subscribe(data =>{
        this.logos = data;
      })
      this.voteService.getUsersCreatedDate(this.name).subscribe(data => {
        this.joinDate = data;
      })
    })
    this.forumService.checkAdmin().subscribe(result =>{
      this.isAdmin = result;
    })
    this.postService.getPostsByCurrentUser().subscribe(posts => {
    this.posts = posts;
    this.viewPosts = true;
  })
  }
  showPosts(){
    this.postService.getPostsByCurrentUser().subscribe(posts => {
      this.posts = posts;
      this.viewPosts = true;
      if(posts.length < 1){
        this.noPosts = true;
      }
    })
  }
  showComments(){
    this.commentService.getCommentsByCurrentUser().subscribe(comments =>{
        this.comments = comments;
        this.viewPosts = false;
        if(comments.length < 1){
          this.noComments = true;
        }
    })
  }
}
