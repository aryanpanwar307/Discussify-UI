import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { API_URL } from '../../config';

@Component({
  selector: 'app-create-community',
  templateUrl: './community-create.component.html',
  styleUrls: ['./community-create.component.css'],
})
export class CreateCommunityComponent {
  createCommunityForm: FormGroup;
  bannerFile: File | null = null;
  isBannerUploaded = false;

  constructor(private fb: FormBuilder, private http: HttpClient, private router: Router) {
    this.createCommunityForm = this.fb.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
      isPublic: ['true', Validators.required], // Default to public
    });
  }

  onFileChange(event: any): void {
    const file = event.target.files[0];
    if (file) {
      this.bannerFile = file;
    }
  }

  uploadBanner(communityId: string): void {
    if (!this.bannerFile) return;

    const token = localStorage.getItem('token')
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`)
    const formData = new FormData();
    formData.append('banner', this.bannerFile);

  this.http.post(`${API_URL}/communities/${communityId}/banner`, formData, { headers }).subscribe({
      next: () => {
        this.isBannerUploaded = true;
        alert('Banner uploaded successfully!');
      },
      error: (err) => {
        console.error('Banner upload failed:', err);
        alert('Banner upload failed. Please try again.');
      },
    });
  }

  onSubmit(): void {
    if (this.createCommunityForm.invalid) return;

    const { name, description, isPublic } = this.createCommunityForm.value;
    const token = localStorage.getItem('token')
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`)
    // Create the community
  this.http.post<{ community: any }>(`${API_URL}/communities`, {
      name,
      description,
      isPublic: isPublic === 'true', // Convert to boolean

    }, { headers })
      .subscribe({
        next: (response) => {
          const communityId = response?.community._id;
          if (this.bannerFile) {
            this.uploadBanner(communityId); // Upload banner after community creation
          } else {
            this.router.navigate(['/home']); // Redirect to home if no banner
          }
        },
        error: (err) => {
          console.error('Community creation failed:', err);
          alert('Community creation failed. Please try again.');
        },
      });
  }
}
