import { Component, Input, OnInit, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PostModel } from '../post-tile/post-model';
import { PostService } from '../shared/post.service';
import {MatDialog} from '@angular/material/dialog';
import { DialogCompComponent } from '../dialog-comp/dialog-comp.component';

@Component({
  selector: 'app-view-forum',
  templateUrl: './view-forum.component.html',
  styleUrls: ['./view-forum.component.css']
})
export class ViewForumComponent implements OnInit {
  name : string;
  @Input() p: PostModel[];
  posts: Array<PostModel> = [];
  constructor(private postService: PostService,private activateRoute: ActivatedRoute,public dialog:MatDialog) {
      this.name = this.activateRoute.snapshot.params.name;
      this.postService.getPostsByForumName(this.name).subscribe(post => {
        this.posts = post;
      });
   }
   openDialog(){
     let dialogRef = this.dialog.open(DialogCompComponent,{data:{name: this.name}});
     dialogRef.afterClosed().subscribe(result =>{
        console.log(`Dialog result: ${result}`);
     })
   }

  ngOnInit(): void {
  }

}
