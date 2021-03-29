import { ɵHttpInterceptingHandler } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CommentModel } from '../comment-tile/comment-model';
import { PostModel } from '../post-tile/post-model';
import { CommentService } from '../shared/comment.service';
import { PostService } from '../shared/post.service';
import { VoteService } from '../shared/vote.service';

@Component({
  selector: 'app-view-other-profile',
  templateUrl: './view-other-profile.component.html',
  styleUrls: ['./view-other-profile.component.css']
})
export class ViewOtherProfileComponent implements OnInit {
  name:string;
  viewPosts:boolean;
  comments : Array<CommentModel>;
  posts : Array<PostModel>;
  viewComments:boolean;
  joinDate: String;
  logos:number;
  noPosts:boolean;
  noComments:boolean;
  constructor(private postService: PostService,private activateRoute: ActivatedRoute,private commentService:CommentService,private router: Router,private toastr:ToastrService,private voteService:VoteService) {
    this.name = this.activateRoute.snapshot.params.user;
    this.noComments = false;
      this.noPosts = false;
    this.postService.getPostsByUser(this.name).subscribe(posts =>{
      this.posts = posts;
      this.viewPosts = true;
    }, error => {
      this.router.navigate(['home'])
    })
  
    this.voteService.getUsersLogos(this.name).subscribe(data =>{
      this.logos = data;
    })
    this.voteService.getUsersCreatedDate(this.name).subscribe(data => {
      this.joinDate = data;
    })
   }

  ngOnInit(): void {
  }
  showPosts(){
    this.postService.getPostsByUser(this.name).subscribe(posts => {
      this.posts = posts;
      this.viewPosts = true;
      if(posts.length < 1){
        this.noPosts = true;
      }
    })
  }
  showComments(){
    this.commentService.getCommentsByUser(this.name).subscribe(comments =>{
      this.comments = comments;
      this.viewPosts = false;
      if(comments.length < 1){
        this.noComments = true;
      }
  })
}
}
