import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-update-profile',
  templateUrl: './update-profile.component.html',
  styleUrls: ['./update-profile.component.css'],
})
export class UpdateProfileComponent implements OnInit {
  updateProfileForm: FormGroup;
  profilePictureFile: File | null = null;

  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private router: Router,
    private authService: AuthService
  ) {
    this.updateProfileForm = this.fb.group({
      username: ['', Validators.required],
      bio: [''],
    });
  }

  ngOnInit(): void {
    this.fetchProfileData();
  }

  fetchProfileData(): void {
    const token = localStorage.getItem('token')
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`)
    this.http.get('http://localhost:3000/api/profile',{headers}).subscribe({
      next: (response: any) => {
        this.updateProfileForm.patchValue({
          username: response.username,
          bio: response.bio,
        });
      },
      error: (err) => {
        console.error('Failed to fetch profile data:', err);
      },
    });
  }

  onFileChange(event: any): void {
    const file = event.target.files[0];
    if (file) {
      this.profilePictureFile = file;
    }
  }

  onSubmit(): void {
    if (this.updateProfileForm.invalid) return;

    const { username, bio } = this.updateProfileForm.value;
    const token = localStorage.getItem('token')
        const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`)
    // Update profile information
    this.http
      .put('http://localhost:3000/api/profile', { username, bio },{headers})
      .subscribe({
        next: () => {
          alert('Profile updated successfully!');
          if (this.profilePictureFile) {
            this.uploadProfilePicture(); // Upload profile picture if a file is selected
          } else {
            this.router.navigate(['/home']);
          }
        },
        error: (err) => {
          console.error('Failed to update profile:', err);
        },
      });
  }

  uploadProfilePicture(): void {
    if (!this.profilePictureFile) return;

    const formData = new FormData();
    formData.append('image', this.profilePictureFile);
    const token = localStorage.getItem('token')
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`)
    this.http.post('http://localhost:3000/api/profile/picture', formData,{headers}).subscribe({
      next: () => {
        alert('Profile picture uploaded successfully!');
        this.router.navigate(['/home']);
      },
      error: (err) => {
        console.error('Failed to upload profile picture:', err);
      },
    });
  }
}