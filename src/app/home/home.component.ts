import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ForumModel } from '../forum-tile/forum-model';
import { ForumService} from '../shared/forum.service';

export interface DialogData {
  forumName: string;
  description: string;
}
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  forums: Array<ForumModel> =[];
  forumFour: Array<ForumModel>;
  forumName:string;
  description:string;
  constructor(private forumService:ForumService,public dialog:MatDialog) { 
    this.forumService.getAllForums().subscribe(forum =>{
      this.forums = forum;
    })
    
  }

  ngOnInit(): void {
  }
  getAllForums(){
    console.log('clicked');
  }
  getMostActive(){
    this.forumService.getAllByActive().subscribe(forum =>{
      this.forums = forum;
    })
  }
  getMostPopular(){
    this.forumService.getAllByPopularity().subscribe(forum =>{
      this.forums = forum;
      console.log('called')
    })
  }

  modo(value: string){
    switch(value) {
      case "active":
         // if modo 1 is selected do something.
         this.getMostActive()
         break;
      case "popular":
         // if modo 2 is selected do something.
         this.getMostPopular();
         break;
      case "new":
         // if modo 3 is selected do something.
         console.log('new')

         break;
    }
  }

}
