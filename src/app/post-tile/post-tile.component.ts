import { Component, OnInit, Input} from '@angular/core';
import { Router } from '@angular/router';
import { PostModel } from './post-model';
import { faComments } from '@fortawesome/free-regular-svg-icons';
import {MatButton} from '@angular/material/button';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';

@Component({
  selector: 'app-post-tile',
  templateUrl: './post-tile.component.html',
  styleUrls: ['./post-tile.component.css']
})
export class PostTileComponent implements OnInit {
  
  name: string;
  @Input() posts: PostModel[];
  icon = faComments
  matButton = MatButton
  constructor(private router: Router,public dialog: MatDialog) {
   }
   

  ngOnInit(): void {
  }

}
