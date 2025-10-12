export interface Resource{
    id:string;
    title:string;
    description:string;
    fileUrl:string; //userId
    upvotes:number;
    uploadedBy:string;
    tags:string[];
}