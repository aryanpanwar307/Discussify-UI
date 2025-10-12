export interface Comment {
    id:string;
    content:string;
    author:string; //userId
    upvotes:number;
    downvotes:number;
}