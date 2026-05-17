import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { API_URL } from '../../config';

interface Resource {
  _id: string;
  title: string;
  type: string;
  sharedBy: { username: string };
}

interface Discussion {
  _id: string;
  title: string;
  author: { username: string };
}

interface User {
  _id: string;
  username: string;
  email: string;
  isBanned: boolean;
}

interface Community {
  _id: string;
  name: string;
  createdBy: { username: string };
}

@Component({
  selector: 'app-admin',
  templateUrl: './admin-panel.component.html',
  styleUrls: ['./admin-panel.component.css'],
})
export class AdminPanelComponent implements OnInit {
  resources: Resource[] = [];
  discussions: Discussion[] = [];
  users: User[] = [];
  communities: Community[] = [];
  deleteDiscussionForm: FormGroup;
  selectedDiscussionId: string | null = null;

  constructor(private http: HttpClient, private router: Router, private fb : FormBuilder) 
  {this.deleteDiscussionForm = this.fb.group({
    reason: ['', Validators.required],
  });}

  ngOnInit(): void {
    this.fetchAllResources();
    this.fetchAllDiscussions();
    this.fetchAllUsers();
    this.fetchAllCommunities();
  }

  fetchAllResources(): void {
  this.http.get<{data:Resource[]}>(`${API_URL}/resources`).subscribe({
      next: (response) => {
        this.resources = response.data;
      },
      error: (err) => {
        console.error('Failed to fetch resources:', err);
      },
    });
  }

  fetchAllDiscussions(): void {
    const token = localStorage.getItem('token')
        const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`)
  this.http.get<{data:Discussion[]}>(`${API_URL}/discussions`,{headers}).subscribe({
      next: (response) => {
        this.discussions = response.data;
      },
      error: (err) => {
        console.error('Failed to fetch discussions:', err);
      },
    });
  }

  fetchAllUsers(): void {
    const token = localStorage.getItem('token')
        const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`)
  this.http.get<{data:User[]}>(`${API_URL}/profile/allProfiles`, {headers}).subscribe({
      next: (response) => {
        console.log(response)
        this.users = response.data;
      },
      error: (err) => {
        console.error('Failed to fetch users:', err);
      },
    });
  }

  fetchAllCommunities(): void {
  this.http.get<{data:Community[]}>(`${API_URL}/communities`).subscribe({
      next: (response) => {        
        this.communities = response.data;

      },
      error: (err) => {
        console.error('Failed to fetch communities:', err);
      },
    });
  }

  deleteResource(resourceId: string): void {
  this.http.delete(`${API_URL}/admin/resources`, { body: { resourceId } }).subscribe({
      next: () => {
        alert('Resource deleted successfully!');
        this.fetchAllResources(); // Refresh resources list
      },
      error: (err) => {
        console.error('Failed to delete resource:', err);
      },
    });
  }

  openDeleteModal(discussionId: string): void {
    this.selectedDiscussionId = discussionId;
    // Open the modal
    const modal = document.getElementById('deleteDiscussionModal');
    if (modal) {
      modal.classList.add('show');
      modal.style.display = 'block';
      modal.setAttribute('aria-hidden', 'false');
    }
  }

  closeDeleteModal(): void {
    this.selectedDiscussionId = null;
    this.deleteDiscussionForm.reset();
    // Close the modal
    const modal = document.getElementById('deleteDiscussionModal');
    if (modal) {
      modal.classList.remove('show');
      modal.style.display = 'none';
      modal.setAttribute('aria-hidden', 'true');
    }
  }

  deleteDiscussion(): void {
    if (this.deleteDiscussionForm.invalid || !this.selectedDiscussionId) return;

    const reason = this.deleteDiscussionForm.value.reason;
    const token = localStorage.getItem('token')
        const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`)
    this.http
      .delete(`${API_URL}/admin/discussions`, {
        headers,
        body: { discussionId: this.selectedDiscussionId, reason },
      })
      .subscribe({
        next: () => {
          alert('Discussion deleted successfully!');
          this.fetchAllDiscussions(); // Refresh discussions list
          this.closeDeleteModal(); // Close the modal
        },
        error: (err) => {
          console.error('Failed to delete discussion:', err);
        },
      });
  }


  banUser(userId: string): void {
  this.http.post(`${API_URL}/admin/ban`, { userId }).subscribe({
      next: () => {
        alert('User banned successfully!');
        this.fetchAllUsers(); // Refresh users list
      },
      error: (err) => {
        console.error('Failed to ban user:', err);
      },
    });
  }

  navigateToCreateCommunity(): void {
    this.router.navigate(['/create-community']);
  }
}