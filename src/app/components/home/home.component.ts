import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthService } from '../../services/auth.service';
import { API_URL } from '../../config';
import { Router } from '@angular/router';

interface Community {
  _id: string;
  name: string;
  description: string;
  banner: string;
  isPublic: boolean;
}

interface Discussion {
  _id: string;
  title: string;
  content: string;
  author: { username: string };
  upvotes: number;
  downvotes: number;
  community: { name: string };
}

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  yourCommunities: Community[] = [];
  discussions: Discussion[] = [];
  otherCommunities: Community[] = [];

  constructor(private http: HttpClient, private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
    this.fetchYourCommunities();
    this.fetchDiscussions();
    this.fetchOtherCommunities();
  }

  fetchYourCommunities(): void {
    const token = localStorage.getItem('token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    // Step 1: Fetch user profile to get joined community IDs
  this.http.get<{ success: boolean; data: any }>(`${API_URL}/profile`, { headers })
      .subscribe({
        next: (profileResponse) => {
          if (profileResponse.success && profileResponse.data?.communities?.length) {
            localStorage.setItem('admin', profileResponse.data.isAdmin ? "true" : "");

            const communityIds = profileResponse.data.communities; // Array of community IDs

            // Step 2: Fetch community details using the community IDs
            this.http.post<{ communities: Community[] }>(
              `${API_URL}/profile/getCommunities`,
              { communityIds },
              { headers }
            ).subscribe({
              next: (communityResponse) => {

                this.yourCommunities = communityResponse.communities; // Store the fetched community details

              },
              error: (err) => {
                console.error('Failed to fetch community details:', err);
              }
            });

          } else {
            this.yourCommunities = []; // No communities joined
          }
        },
        error: (err) => {
          console.error('Failed to fetch your profile:', err);
        }
      });
  }


  fetchDiscussions(): void {
    const token = localStorage.getItem('token')
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`)
  this.http.get<{ data: Discussion[] }>(`${API_URL}/discussions`, { headers }).subscribe({
      next: (response) => {
        this.discussions = response.data;
      },
      error: (err) => {
        console.error('Failed to fetch discussions:', err);
      },
    });
  }

  fetchOtherCommunities(): void {
    const token = localStorage.getItem('token')
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`)
  this.http.get<{ success: boolean, data: Community[] }>(`${API_URL}/communities`, { headers }).subscribe({
      next: (response) => {
        // Filter out communities the user is already part of
        this.otherCommunities = response.data.filter(
          (community: any) => !this.yourCommunities.some((c) => c._id === community._id)
        );
      },
      error: (err) => {
        console.error('Failed to fetch other communities:', err);
      },
    });
  }

  joinCommunity(communityId: string): void {
    const token = localStorage.getItem('token')
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`)
  this.http.post(`${API_URL}/communities/${communityId}/join`, {}, { headers }).subscribe({
      next: () => {
        alert('Joined community successfully!');
        this.fetchYourCommunities(); // Refresh your communities list
        this.fetchOtherCommunities(); // Refresh other communities list
      },
      error: (err) => {
        console.error('Failed to join community:', err);
      },
    });
  }

  navigateToCommunity(communityId: string): void {
    this.router.navigate([`communities/${communityId}`]);
  }
  navigateToDiscussion(discussionId: string): void {
    this.router.navigate([`discussions/${discussionId}`]);
  }
}
