import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { CommentModel } from '../comment-tile/comment-model';
import { PostModel } from '../post-tile/post-model';
import { CommentPayload } from '../shared/comment-request-payload';
import { CommentService } from '../shared/comment.service';
import { PostService } from '../shared/post.service';

@Component({
  selector: 'app-view-post',
  templateUrl: './view-post.component.html',
  styleUrls: ['./view-post.component.css']
})
export class ViewPostComponent implements OnInit {
  id:number;
  @Input() p: PostModel;
  post: PostModel[];
  comments: Array<CommentModel>;
  commentRequest : CommentPayload;
  createComment: FormGroup;
  constructor(private postService: PostService,private toastr:ToastrService,private commentService: CommentService,private activateRoute: ActivatedRoute) {
    this.id = this.activateRoute.snapshot.params.id;
    this.postService.getPost(this.id).subscribe(p =>{
      this.p = p;
    })
    this.commentRequest = {
      postId : this.id,
      text : ''
    }
   }

  ngOnInit(): void {
    this.createComment = new FormGroup({
      text : new FormControl('',[Validators.required,Validators.minLength(1),Validators.maxLength(100)])
    })
    this.commentService.getCommentsByPost(this.id).subscribe(c => {
      this.comments = c;
    })
  }

  makeComment(){
    this.commentRequest.text = this.createComment.get('text').value;
    this.commentService.createComment(this.commentRequest).subscribe(data => {
      this.toastr.success("Comment added")
      this.updateComments();
    }, error => {
      this.toastr.error('Comment failed');
    });
  
  }
  updateComments(){
    this.commentService.getCommentsByPost(this.id).subscribe(c => {
      this.comments = c;
    })
  }

}
