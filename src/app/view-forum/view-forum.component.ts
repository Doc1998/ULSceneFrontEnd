import { Component, Input, OnInit, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PostModel } from '../post-tile/post-model';
import { PostService } from '../shared/post.service';
import {MatDialog} from '@angular/material/dialog';
import { ForumModel } from '../forum-tile/forum-model';
import { ForumService } from '../shared/forum.service';
import { JoinForumRequestPayload } from '../forum-tile/joinForum.request.payload';
import { AuthService } from '../shared/auth.service';
import { ToastrService } from 'ngx-toastr';
import { UserModel } from '../shared/user-model';
import { FormControl, FormGroup } from '@angular/forms';
import { ModeratorRequest } from './moderator-request-payload';

@Component({
  selector: 'app-view-forum',
  templateUrl: './view-forum.component.html',
  styleUrls: ['./view-forum.component.css']
})
export class ViewForumComponent implements OnInit {
  name : string;
  username:string;
  isPrivate : boolean;
  joinRequest: JoinForumRequestPayload;
  addNewMemberToForum: FormGroup;
  removeMemberFromForum: FormGroup;
  banUser:FormGroup;
  addNewModerator:FormGroup;
  removeModerator:FormGroup;
  moderatorRequest:ModeratorRequest;
  isMember : boolean;
  isMod:boolean;
  isAdmin:boolean;
  isBanned:boolean;
  isDoge:boolean;
  @Input() forum : ForumModel;
  posts: Array<PostModel> = [];
  mods: Array<UserModel> = [];
  constructor(private postService: PostService,private router:Router,private activateRoute: ActivatedRoute,public dialog:MatDialog,private forumService:ForumService, private authService:AuthService, private toastr:ToastrService) {
      this.name = this.activateRoute.snapshot.params.name;
      this.postService.getPostsByForumName(this.name).subscribe(post => {
        this.posts = post;
      });
      this.forumService.getForumByName(this.name).subscribe(forum =>{
        this.forum = forum;
        this.isPrivate = forum.private
      })
      this.forumService.checkMembership(this.name).subscribe(result =>{
        this.isMember = result;
        if(this.isMember == true){
          this.isPrivate = false;
        }
      })
      this.forumService.checkModerator(this.name).subscribe(result =>{
        this.isMod = result;
      })
      this.forumService.checkBanned(this.name).subscribe(result => {
        this.isBanned = result;
        console.log(this.isBanned);
      })
      this.forumService.getForumModerators(this.name).subscribe(result =>{
        this.mods = result;
      })
      this.forumService.checkAdmin().subscribe(result =>{
        this.isAdmin = result;
      })
      this.authService.getCurrentUser().subscribe(data => {
        this.username = data.username;
        this.joinRequest.username = this.username;
      })
      this.joinRequest = {
        username : this.username,
        forumName : this.name
      }
      this.moderatorRequest = {
        usernameBeingAdded: '',
        forumName : this.name
      }
     
      

   }

  ngOnInit(): void {
    this.addNewMemberToForum = new FormGroup({
      username: new FormControl('')
    })
    this.removeMemberFromForum = new FormGroup({
      userName: new FormControl('')
    })
    this.addNewModerator = new FormGroup({
      newModName: new FormControl(''),
      forumName: new FormControl('')
    })
    this.banUser = new FormGroup({
      bannedName: new FormControl(''),
      forumName: new FormControl('')
    })
    this.removeModerator = new FormGroup({
      userName: new FormControl('')
    })
  }

  joinForum(){
    this.forumService.joinForum(this.joinRequest).subscribe(() =>{
      this.toastr.success('You have joined this forum');
      this.isMember = true;
    }, error => {
      this.toastr.error("Error");
    })
  }
  orderPostsByVotes(){
    this.postService.getPostsByMostPopular(this.name).subscribe(post => {
      this.posts = post;
    });
  }
  orderPostsByBestOfWeek(){
    this.postService.getPostsByBestOfWeek(this.name).subscribe(post => {
      this.posts = post;
    });
  }
  addMember(){
    this.joinRequest.username = this.addNewMemberToForum.get('username').value;
    this.forumService.joinForum(this.joinRequest).subscribe(() =>{
      this.toastr.success('User is now a member this forum');
    }, error => {
      this.toastr.error("Error incorrect details");
    })
  }
  removeMember(){
    this.joinRequest.username = this.removeMemberFromForum.get('userName').value;
    this.forumService.leaveForum(this.joinRequest).subscribe(() =>{
      this.toastr.success('User is no longer a member of the forum');
    }, error => {
      this.toastr.error("Error incorrect details");
    })
  }
  leaveForum(){
    this.forumService.leaveForum(this.joinRequest).subscribe(() =>{
      this.toastr.success('You are no longer a member of the forum');
      this.isMember = false;
    }, error => {
      this.toastr.error("Error");
    })
  }
  addModerator(){
    this.moderatorRequest.usernameBeingAdded = this.addNewModerator.get('newModName').value;
    this.moderatorRequest.forumName = this.name;
    this.forumService.addModerator(this.moderatorRequest).subscribe(() => {
      this.toastr.success('Moderator has been added successfully');
    }, error => {
      this.toastr.error("Error");
    })
  }
  removeMod(){
    this.moderatorRequest.usernameBeingAdded = this.removeModerator.get('userName').value;
    this.moderatorRequest.forumName = this.name;
    this.forumService.removeModerator(this.moderatorRequest).subscribe(() => {
      this.toastr.success('Moderator has been removed successfully');
    }, error => {
      this.toastr.error("Error");
    })
  }
  deleteForum(){
    this.forumService.deleteForum(this.forum.id).subscribe(() =>{
      this.router.navigate(['home'])
      this.toastr.success('Forum deleted successfully');
    }, error => {
      this.toastr.error("Error");
    })
  }
  banUserFromForum(){
    this.moderatorRequest.usernameBeingAdded = this.banUser.get('bannedName').value;
    this.moderatorRequest.forumName = this.name;
    this.forumService.banUser(this.moderatorRequest).subscribe(() => {
      this.toastr.success('User has been banned successfully');
    }, error => {
      this.toastr.error("Error");
    })
  }

}
