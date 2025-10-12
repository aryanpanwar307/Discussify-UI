import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';

interface Discussion {
  _id: string;
  title: string;
  content: string;
  author: { username: string };
  upvotes: number;
  downvotes: number;
  comments: { username: string; content: string }[];
}

@Component({
  selector: 'app-discussion',
  templateUrl: './discussion.component.html',
  styleUrls: ['./discussion.component.css'],
})
export class DiscussionComponent implements OnInit {
  discussionId: string;
  discussion: Discussion | null = null;
  newComment = '';

  constructor(private http: HttpClient, private route: ActivatedRoute) {
    this.discussionId = this.route.snapshot.params['discussionId'];
  }

  ngOnInit(): void {
    this.fetchDiscussionDetails();
  }

  fetchDiscussionDetails(): void {
    this.http.get<{data:Discussion}>(`http://localhost:3000/api/discussions/${this.discussionId}/details`).subscribe({
      next: (response) => {
        this.discussion = response.data;
      },
      error: (err) => {
        console.error('Failed to fetch discussion details:', err);
      },
    });
  }

  addComment(): void {
    if (!this.newComment.trim()) return;
    const token = localStorage.getItem('token')
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`)
    this.http
      .post(`http://localhost:3000/api/discussions/${this.discussionId}/comment`, { content: this.newComment },{headers})
      .subscribe({
        next: () => {
          this.newComment = '';
          this.fetchDiscussionDetails(); // Refresh discussion details
        },
        error: (err) => {
          console.error('Failed to add comment:', err);
        },
      });
  }

  upvote(): void {
    const token = localStorage.getItem('token')
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`)
    this.http.post(`http://localhost:3000/api/discussions/${this.discussionId}/upvote`, {}, {headers}).subscribe({
      next: () => {
        this.fetchDiscussionDetails(); // Refresh discussion details
      },
      error: (err) => {
        console.error('Failed to upvote:', err);
      },
    });
  }

  downvote(): void {
    const token = localStorage.getItem('token')
        const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`)
    this.http.post(`http://localhost:3000/api/discussions/${this.discussionId}/downvote`, {}, {headers}).subscribe({
      next: () => {
        this.fetchDiscussionDetails(); // Refresh discussion details
      },
      error: (err) => {
        console.error('Failed to downvote:', err);
      },
    });
  }
}
