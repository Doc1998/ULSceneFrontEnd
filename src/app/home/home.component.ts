import { Component, OnInit } from '@angular/core';
import { ForumModel } from '../forum-tile/forum-model';
import { ForumService} from '../shared/forum.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  forums: Array<ForumModel> =[];
  forumFour: Array<ForumModel>;
  constructor(private forumService:ForumService) { 
    this.forumService.getAllForums().subscribe(forum =>{
      this.forums = forum;
    })
    this.forumService.getForumById(5).subscribe(forumfour =>{
      this.forumFour = forumfour
    })
  }

  ngOnInit(): void {
  }

}
