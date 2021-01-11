import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ForumModel } from './forum-model';

@Component({
  selector: 'app-forum-tile',
  templateUrl: './forum-tile.component.html',
  styleUrls: ['./forum-tile.component.css']
})
export class ForumTileComponent implements OnInit {

  @Input() forums: ForumModel[];
  constructor(private router: Router) { }

  ngOnInit(): void {
  }

}
