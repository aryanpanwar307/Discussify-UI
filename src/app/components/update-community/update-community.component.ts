import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { API_URL } from '../../config';

interface Community {
  _id: string;
  name: string;
}

@Component({
  selector: 'app-create-community',
  templateUrl: './update-community.component.html',
  styleUrls: ['./update-community.component.css'],
})
export class UpdateCommunityComponent implements OnInit {
  createCommunityForm: FormGroup;
  communities: Community[] = [];
  selectedCommunityId: string | null = null;

  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private router: Router
  ) {
    this.createCommunityForm = this.fb.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
      isPublic: ['true', Validators.required],
      communityId: ['', Validators.required], // Dropdown for community selection
    });
  }

  ngOnInit(): void {
    this.fetchUserCommunities();
  }

  fetchUserCommunities(): void {
  this.http.get<Community[]>(`${API_URL}/profile/getCommunities`).subscribe({
      next: (response) => {
        this.communities = response;
      },
      error: (err) => {
        console.error('Failed to fetch user communities:', err);
      },
    });
  }

  onSubmit(): void {
    if (this.createCommunityForm.invalid) return;

    const { name, description, isPublic, communityId } = this.createCommunityForm.value;

    // Update the selected community
    this.http
  .put(`${API_URL}/communities/${communityId}`, {
        name,
        description,
        isPublic: isPublic === 'true',
      })
      .subscribe({
        next: () => {
          alert('Community updated successfully!');
          this.router.navigate([`/community/${communityId}`]); // Redirect to community details
        },
        error: (err) => {
          console.error('Failed to update community:', err);
        },
      });
  }
}