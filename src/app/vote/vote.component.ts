import { Component, Input, OnInit } from '@angular/core';
import { AuthService } from '../shared/auth.service';
import { PostService } from '../shared/post.service';
import { VoteService } from '../shared/vote.service';
import { faArrowUp, faArrowDown } from '@fortawesome/free-solid-svg-icons';
import { VotePayload } from '../post-tile/vote-payload';
import { PostModel } from '../post-tile/post-model';
import { VoteType } from '../post-tile/vote-type';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-vote',
  templateUrl: './vote.component.html',
  styleUrls: ['./vote.component.css']
})
export class VoteComponent implements OnInit {
  faArrowUp = faArrowUp;
  faArrowDown = faArrowDown;
  votePayload: VotePayload;
  upvoteColor: string;
  downvoteColor: string;
  isLoggedIn: boolean;
  @Input() post: PostModel;
  constructor(private voteService: VoteService,
    private authService: AuthService,
    private postService: PostService,private toastr: ToastrService) { 
      this.votePayload = {
        voteType: undefined,
        postId: undefined
      }
      this.authService.loggedIn.subscribe((data: boolean) => this.isLoggedIn = data);
    }

  ngOnInit(): void {
    this.updateVoteDetails();
  }
  upvotePost(){
    this.votePayload.voteType = VoteType.UPVOTE;
    this.vote();
    this.downvoteColor = '';
  }
  downvotePost(){
    this.votePayload.voteType = VoteType.DOWNVOTE;
    this.vote();
    this.upvoteColor = '';
  }
  private vote(){
    this.votePayload.postId = this.post.id;
    this.voteService.vote(this.votePayload).subscribe(() =>{
      this.updateVoteDetails();
    }, error => {
      this.toastr.error("Vote failed");
      
    })
  }
  private updateVoteDetails() {
    this.postService.getPost(this.post.id).subscribe(post => {
        this.post = post
    })
  }

}
