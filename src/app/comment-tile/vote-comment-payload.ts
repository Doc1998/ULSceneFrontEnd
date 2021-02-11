import { VoteType } from "../post-tile/vote-type";


export class VoteCommentPayload {
    voteType: VoteType;
    commentId: number;
}