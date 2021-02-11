import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CommentModel } from '../comment-tile/comment-model';
import { PostModel } from '../post-tile/post-model';
import { CommentService } from '../shared/comment.service';
import { PostService } from '../shared/post.service';

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
  constructor(private router: Router,private toastr:ToastrService,private postService: PostService,private commentService:CommentService) { 
    this.postService.getPostsByCurrentUser().subscribe(posts => {
      this.posts = posts;
      this.viewPosts = true;
    })
  }

  ngOnInit(): void {
  }
  showPosts(){
    this.postService.getPostsByCurrentUser().subscribe(posts => {
      this.posts = posts;
      this.viewPosts = true;
    })
  }
  showComments(){
    this.commentService.getCommentsByCurrentUser().subscribe(comments =>{
        this.comments = comments;
        this.viewPosts = false;
        console.log('ok');
    })
  }
}
