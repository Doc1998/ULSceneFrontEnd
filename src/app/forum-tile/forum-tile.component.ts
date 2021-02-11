import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { faLock } from '@fortawesome/free-solid-svg-icons';
import { ForumModel } from './forum-model';

@Component({
  selector: 'app-forum-tile',
  templateUrl: './forum-tile.component.html',
  styleUrls: ['./forum-tile.component.css']
})
export class ForumTileComponent implements OnInit {

  @Input() forums: ForumModel[];
  faLock = faLock;
  isPrivate : boolean;
  constructor(private router: Router) {
    this.isPrivate = true;
   }

  ngOnInit(): void {
  }
  

}
