import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { throwError } from 'rxjs';
import { ForumRequestPayload } from '../create-community/forum.request.payload';
import { ForumModel } from '../forum-tile/forum-model';
import { ForumService } from '../shared/forum.service';
import { PostService } from '../shared/post.service';
import { PostRequestPayload } from './post.request.payload';

@Component({
  selector: 'app-create-post',
  templateUrl: './create-post.component.html',
  styleUrls: ['./create-post.component.css']
})
export class CreatePostComponent implements OnInit {
  createPost: FormGroup;
  postRequest : PostRequestPayload;
  forums : Array<ForumModel>;

  constructor(private router: Router,private toastr:ToastrService,private forumService: ForumService,private postService: PostService) {
    this.postRequest = {
      postName : '',
      description : '',
      forumName: '',
      url : ''
    }
   }

  ngOnInit(): void {
    this.createPost = new FormGroup({
      postName : new FormControl('',[Validators.required,Validators.minLength(1),Validators.maxLength(100)]),
      content : new FormControl('',[Validators.required,Validators.minLength(1),Validators.maxLength(500)]),
      forumName : new FormControl('',Validators.required)
    })
    this.forumService.getAllForums().subscribe((data) => {
      this.forums = data;
    }, error => {
      throwError(error);
    })
  }
  makePost(){
      this.postRequest.postName = this.createPost.get('postName').value;
      this.postRequest.description = this.createPost.get('content').value;
      this.postRequest.forumName = this.createPost.get('forumName').value;
      this.postService.createPost(this.postRequest).subscribe(data => {
        this.router.navigate(['home'],
        {queryParams:{created:'true'}});
      }, error => {
        this.toastr.error('Post failed');
      });
  }
}
