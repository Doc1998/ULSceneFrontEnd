import { Component, OnInit, Input} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PostModel } from './post-model';
import { faComments } from '@fortawesome/free-regular-svg-icons';
import { faThumbsUp,faThumbsDown,faTrashAlt } from '@fortawesome/free-regular-svg-icons';
import {MatButton} from '@angular/material/button';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { AuthService } from '../shared/auth.service';
import { ToastrService } from 'ngx-toastr';
import { ForumService } from '../shared/forum.service';
import { PostService } from '../shared/post.service';

@Component({
  selector: 'app-post-tile',
  templateUrl: './post-tile.component.html',
  styleUrls: ['./post-tile.component.css']
})
export class PostTileComponent implements OnInit {
  
  name: string;
  currentUser: string;
  @Input() posts: PostModel[];
  icon = faComments
  matButton = MatButton
  thumbsup = faThumbsUp
  trash = faTrashAlt
  thumbsDown = faThumbsDown
  isMod:boolean;
  isAdmin:boolean;
  isCreator:boolean;
  
  constructor(private postService: PostService,private activateRoute: ActivatedRoute,public dialog:MatDialog,private forumService:ForumService, private authService:AuthService, private toastr:ToastrService) {
    this.name = this.activateRoute.snapshot.params.name;
    this.authService.getCurrentUser().subscribe(user => {
      this.currentUser = user.username;
      console.log(this.currentUser);
    })
    this.forumService.checkAdmin().subscribe(result =>{
      this.isAdmin = result;
    })
    this.forumService.checkModerator(this.name).subscribe(result =>{
      this.isMod = result;
      console.log(this.isMod)
    })
    
   }

  ngOnInit(): void {
  }
  deletePost(id:number) {
    console.log("Delete method has been called!")
    this.postService.deletePost(id).subscribe(result =>{
      this.toastr.success('Post deleted')
    }, error => {
      this.toastr.error("Error");
    })
  }
}
