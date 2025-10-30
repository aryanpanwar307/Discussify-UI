import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { API_URL } from '../../config';

interface Community {
  _id: string;
  name: string;
  description: string;
  isPublic: boolean;
  createdBy: { username: string };
  members: { username: string }[];
}

interface Discussion {
  _id: string;
  title: string;
  content: string;
  author: { username: string };
  upvotes: number;
  downvotes: number;
}

interface Resource {
  _id: string;
  title: string;
  type: string;
  link: string;
  file: string;
  sharedBy: { username: string };
}

@Component({
  selector: 'app-community-details',
  templateUrl: './community-details.component.html',
  styleUrls: ['./community-details.component.css'],
})
export class CommunityDetailsComponent implements OnInit {
  communityId: string;
  community: Community | null = null;
  discussions: Discussion[] = [];
  resources: Resource[] = [];
  showMembers = false;
  isBoolean = !this.community?.members.some((m: any) => m.username === this.authService?.getUsername())

  constructor(
    private http: HttpClient,
    private route: ActivatedRoute,
    private router: Router,
    public authService: AuthService
  ) {
    this.communityId = this.route.snapshot.params['communityId'];
  }

  ngOnInit(): void {
    this.fetchCommunityDetails();
    this.fetchDiscussions();
    this.fetchResources();
  }

  fetchCommunityDetails(): void {
  this.http.get<{ data: Community }>(`${API_URL}/communities/${this.communityId}`).subscribe({
      next: (response) => {
        this.community = response.data;
      },
      error: (err) => {
        console.error('Failed to fetch community details:', err);
      },
    });
  }

  fetchDiscussions(): void {
  this.http.get<{data:Discussion[]}>(`${API_URL}/discussions/${this.communityId}`).subscribe({
      next: (response) => {
        this.discussions = response.data;
      },
      error: (err) => {

        console.error('Failed to fetch discussions:', err);
      },
    });
  }

  fetchResources(): void {
  this.http.get<{data:Resource[]}>(`${API_URL}/resources/${this.communityId}`).subscribe({
      next: (response) => {
        this.resources = response.data;
      },
      error: (err) => {
        console.error('Failed to fetch resources:', err);
      },
    });
  }

  joinCommunity(): void {
  this.http.post(`${API_URL}/communities/${this.communityId}/join`, {}).subscribe({
      next: () => {
        alert('Joined community successfully!');
        this.fetchCommunityDetails(); // Refresh community details
      },
      error: (err) => {
        console.error('Failed to join community:', err);
      },
    });
  }

  toggleMembers(): void {
    this.showMembers = !this.showMembers;
  }
  navigateToDiscussion(discussionId: string): void {
    this.router.navigate([`discussions/${discussionId}`]);
  }
}
