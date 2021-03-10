import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { throwError } from 'rxjs';
import { PostRequestPayload } from '../create-post/post.request.payload';
import { ForumModel } from '../forum-tile/forum-model';
import { ForumService } from '../shared/forum.service';
import { PostService } from '../shared/post.service';

@Component({
  selector: 'app-create-forum-post',
  templateUrl: './create-forum-post.component.html',
  styleUrls: ['./create-forum-post.component.css']
})
export class CreateForumPostComponent implements OnInit {
  createPost: FormGroup;
  postRequest : PostRequestPayload;
  forums : Array<ForumModel>;
  name: string;

  constructor(private router: Router,private toastr:ToastrService,private forumService: ForumService,private activateRoute: ActivatedRoute,private postService: PostService) { 
    this.name = this.activateRoute.snapshot.params.name;
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
    this.postRequest.forumName = this.name;
    this.postService.createPost(this.postRequest).subscribe(data => {
      this.router.navigate(['/forum/' + this.name],
      {queryParams:{created:'true'}});
    }, error => {
      this.toastr.error('Post failed');
    });
}
}