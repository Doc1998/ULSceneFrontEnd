import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommentModel } from './comment-model';

@Component({
  selector: 'app-comment-tile',
  templateUrl: './comment-tile.component.html',
  styleUrls: ['./comment-tile.component.css']
})
export class CommentTileComponent implements OnInit {
  @Input() comments: CommentModel[];
  constructor(private router: Router) { }

  ngOnInit(): void {
  }

}
