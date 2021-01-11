import { Component, OnInit, Inject } from '@angular/core';
import {MAT_DIALOG_DATA} from '@angular/material/dialog'

@Component({
  selector: 'app-dialog-comp',
  templateUrl: './dialog-comp.component.html',
  styleUrls: ['./dialog-comp.component.css']
})
export class DialogCompComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public data:any) { }

  ngOnInit(): void {
  }

}
