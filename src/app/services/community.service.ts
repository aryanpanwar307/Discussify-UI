import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Community } from '../models/community.model';
import { API_URL } from '../config';

@Injectable({
  providedIn: 'root'
})
export class CommunityService {
  private apiUrl = API_URL + '/communities';

  constructor(private http: HttpClient) {}

  createCommunity(community: Community): Observable<Community> {
    return this.http.post<Community>(this.apiUrl, community);
  }

  getCommunity(id: string): Observable<Community> {
    return this.http.get<Community>(`${this.apiUrl}/${id}`);
  }
  
  joinCommunity(id: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/${id}/join`, {});
  }
  
  upvoteDiscussion(id: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/discussions/${id}/upvote`, {});
  }
  
  downvoteDiscussion(id: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/discussions/${id}/downvote`, {});
  }

  searchCommunities(params: any): Observable<any> {
    return this.http.get(`${this.apiUrl}/search`, { params });
  }

  getAllCommunities(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }
  
  deleteCommunity(id: string): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}
