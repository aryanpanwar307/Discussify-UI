import { Discussion } from './discussion.model'

export interface Community {
    id:string;
    name:string;
    description:string; //userId
    privacy:'public'|'private';
    members:string[];
    discussions:Discussion[];
}