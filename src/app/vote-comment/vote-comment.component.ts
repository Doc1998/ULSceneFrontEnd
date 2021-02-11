import { Component, Input, OnInit } from '@angular/core';
import { AuthService } from '../shared/auth.service';
import { VoteService } from '../shared/vote.service';
import { faArrowUp, faArrowDown } from '@fortawesome/free-solid-svg-icons';
import { VoteType } from '../post-tile/vote-type';
import { ToastrService } from 'ngx-toastr';
import { CommentModel } from '../comment-tile/comment-model';
import { CommentService } from '../shared/comment.service';
import { VoteCommentPayload } from '../comment-tile/vote-comment-payload';

@Component({
  selector: 'app-vote-comment',
  templateUrl: './vote-comment.component.html',
  styleUrls: ['./vote-comment.component.css']
})
export class VoteCommentComponent implements OnInit {
  faArrowUp = faArrowUp;
  faArrowDown = faArrowDown;
  votePayload: VoteCommentPayload;
  upvoteColor: string;
  downvoteColor: string;
  isLoggedIn: boolean;
  @Input() comment: CommentModel;

  constructor(private voteService: VoteService,
    private authService: AuthService,
    private commentService: CommentService,private toastr: ToastrService) {
      this.votePayload = {
        voteType: undefined,
        commentId: undefined
      }
      this.authService.loggedIn.subscribe((data: boolean) => this.isLoggedIn = data);
     }

  ngOnInit(): void {
  }
  upvoteComment(){
    this.votePayload.voteType = VoteType.UPVOTE;
    this.vote();
    this.downvoteColor = '';
  }
  downvoteComment(){
    this.votePayload.voteType = VoteType.DOWNVOTE;
    this.vote();
    this.upvoteColor = '';
  }
  private vote(){
    this.votePayload.commentId = this.comment.id;
    this.voteService.commentVote(this.votePayload).subscribe(() =>{
      this.updateVoteDetails();
    }, error => {
      this.toastr.error("Vote failed");
    })
  }
  private updateVoteDetails() {
    this.commentService.getComment(this.comment.id).subscribe(comment => {
        this.comment = comment
    })
  }

}
