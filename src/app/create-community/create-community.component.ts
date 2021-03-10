import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { ForumService } from '../shared/forum.service';
import { ForumRequestPayload } from './forum.request.payload';

@Component({
  selector: 'app-create-community',
  templateUrl: './create-community.component.html',
  styleUrls: ['./create-community.component.css']
})
export class CreateCommunityComponent implements OnInit {
  createCommunity: FormGroup;
  forumRequest : ForumRequestPayload;
  isPrivate : boolean;
  
  constructor(private router: Router,private toastr:ToastrService,private forumService: ForumService) { 
    this.forumRequest = {
      name : '',
      description : '',
      background: 'normal',
      isPrivate : false
    };
    this.isPrivate = false;
  }

  ngOnInit(): void {
    this.createCommunity = new FormGroup({
        name: new FormControl('',[Validators.required,Validators.minLength(6),Validators.maxLength(75)]),
        description: new FormControl('',[Validators.required,Validators.minLength(30),Validators.maxLength(300)])
    })
  }

  makePrivate(){
    this.forumRequest.isPrivate = !this.forumRequest.isPrivate;
    console.log(this.forumRequest.isPrivate)
    
  }
  createForum(){
      this.forumRequest.name = this.createCommunity.get('name').value;
      this.forumRequest.description = this.createCommunity.get('description').value;
      this.forumService.createForum(this.forumRequest).subscribe(data=>{
        this.router.navigate(['home'],
        {queryParams:{created:'true'}});
      }, error => {
        this.toastr.error('Creation failed, forum name may already exist');
      });
  }
  setDoge(){
    this.forumRequest.background = 'Doge';
    console.log(this.forumRequest.background)
  }
  setGreen(){
    this.forumRequest.background = 'Green';
  }
  setBlue(){
    this.forumRequest.background = 'Blue';
  }
  setStars(){
    this.forumRequest.background = 'Stars';
  }
  setNormal(){
    this.forumRequest.background = 'Normal';
  }
  setOcean(){
    this.forumRequest.background = 'Ocean';
  }
}
