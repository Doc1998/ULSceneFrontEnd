import { Component, Input, OnInit, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PostModel } from '../post-tile/post-model';
import { PostService } from '../shared/post.service';
import {MatDialog} from '@angular/material/dialog';
import { ForumModel } from '../forum-tile/forum-model';
import { ForumService } from '../shared/forum.service';
import { JoinForumRequestPayload } from '../forum-tile/joinForum.request.payload';
import { AuthService } from '../shared/auth.service';
import { ToastrService } from 'ngx-toastr';
import { UserModel } from '../shared/user-model';

@Component({
  selector: 'app-view-forum',
  templateUrl: './view-forum.component.html',
  styleUrls: ['./view-forum.component.css']
})
export class ViewForumComponent implements OnInit {
  name : string;
  isPrivate : boolean;
  joinRequest: JoinForumRequestPayload;
  isMember : boolean;
  @Input() forum : ForumModel;
  posts: Array<PostModel> = [];
  users: Array<UserModel> = [];
  constructor(private postService: PostService,private activateRoute: ActivatedRoute,public dialog:MatDialog,private forumService:ForumService, private authService:AuthService, private toastr:ToastrService) {
      this.name = this.activateRoute.snapshot.params.name;
      this.postService.getPostsByForumName(this.name).subscribe(post => {
        this.posts = post;
      });
      this.forumService.getForumByName(this.name).subscribe(forum =>{
        this.forum = forum;
        console.log('done')
        this.isPrivate = forum.private
      })
      this.forumService.checkMembership(this.name).subscribe(result =>{
        this.isMember = result;
        if(this.isMember == true){
          this.isPrivate = false;
        }
      })
      this.forumService.getForumUsers(this.name).subscribe(result =>{
        this.users = result;
      })
      this.joinRequest = {
        username :this.authService.getUserName(),
        forumName : this.name
      }
   }

  ngOnInit(): void {
  }

  joinForum(){
    this.forumService.joinForum(this.joinRequest).subscribe(() =>{
      this.toastr.success('You have joined this forum');
    }, error => {
      this.toastr.error("Vote failed");
    })
  }

}
