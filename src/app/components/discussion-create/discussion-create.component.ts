import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-create-discussion',
  templateUrl: './discussion-create.component.html',
  styleUrls: ['./discussion-create.component.css'],
})
export class CreateDiscussionComponent implements OnInit {
  createDiscussionForm: FormGroup;
  communityId: string;

  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.createDiscussionForm = this.fb.group({
      title: ['', Validators.required],
      content: ['', Validators.required],
    });
    this.communityId = this.route.snapshot.params['communityId'];
  }

  ngOnInit(): void {}

  onSubmit(): void {
    if (this.createDiscussionForm.invalid) return;

    const { title, content } = this.createDiscussionForm.value;
    const token = localStorage.getItem('token')
        const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`)
    // Create a new discussion
    this.http
      .post('http://localhost:3000/api/discussions', {
        title,
        content,
        communityId: this.communityId,
      }, {headers})
      .subscribe({
        next: () => {
          alert('Discussion created successfully!');
          this.router.navigate([`/community/${this.communityId}`]); // Redirect to community details
        },
        error: (err) => {
          console.error('Failed to create discussion:', err);
        },
      });
  }
}