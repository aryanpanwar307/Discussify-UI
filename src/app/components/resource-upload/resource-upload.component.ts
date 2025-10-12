import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';

interface Community {
  _id: string;
  name: string;
}

@Component({
  selector: 'app-upload-resource',
  templateUrl: './resource-upload.component.html',
  styleUrls: ['./resource-upload.component.css'],
})
export class ResourceUploadComponent implements OnInit {
  uploadResourceForm: FormGroup;
  communities: Community[] = [];
  resourceTypes = ['file', 'document', 'article', 'video', 'other'];
  selectedResourceType = 'file';

  constructor(private fb: FormBuilder, private http: HttpClient, private router: Router) {
    this.uploadResourceForm = this.fb.group({
      title: ['', Validators.required],
      type: ['file', Validators.required],
      link: [''],
      file: [null],
      communityId: ['', Validators.required],
      tags: [''],
    });
  }

  ngOnInit(): void {
    this.fetchUserCommunities();
  }

  fetchUserCommunities(): void {
    this.http.get<{ data: Community[] }>('http://localhost:3000/api/communities').subscribe({
      next: (response) => {
        this.communities = response.data;
      },
      error: (err) => {
        console.error('Failed to fetch communities:', err);
      },
    });
  }

  onResourceTypeChange(event: any): void {
    this.selectedResourceType = event.target.value;
    this.uploadResourceForm.get('link')?.reset();
    this.uploadResourceForm.get('file')?.reset();
  }

  onFileChange(event: any): void {
    const file = event.target.files[0];
    if (file) {
      this.uploadResourceForm.patchValue({ file });
    }
  }

  onSubmit(): void {
    if (this.uploadResourceForm.invalid) return;

    const formData = new FormData();
    formData.append('title', this.uploadResourceForm.value.title);
    formData.append('type', this.uploadResourceForm.value.type);
    formData.append('communityId', this.uploadResourceForm.value.communityId);
    formData.append('tags', this.uploadResourceForm.value.tags);

    if (this.selectedResourceType === 'file') {
      formData.append('file', this.uploadResourceForm.value.file);
    } else {
      formData.append('link', this.uploadResourceForm.value.link);
    }

    const token = localStorage.getItem('token')
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`)
    this.http.post('http://localhost:3000/api/resources', formData, {headers}).subscribe({
      next: () => {
        alert('Resource uploaded successfully!');
        this.router.navigate(['/home']);
      },
      error: (err) => {
        console.error('Resource upload failed:', err);
        alert('Resource upload failed. Please try again.');
      },
    });
  }
}
