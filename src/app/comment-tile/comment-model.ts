export class CommentModel {
    text: string;
    username?:string;
    duration?: string;
    postName:string;
    id:number;
    upVote: boolean;
    downVote: boolean;
    voteCount: number;
}