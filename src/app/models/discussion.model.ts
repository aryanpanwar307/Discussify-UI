import { Comment } from "./comment.model";

export interface Discussion {
    id:string;
    title:string;
    content:string;
    author:string; //userId
    upvotes:number;
    downvotes:number;
    comments:Comment[];
}