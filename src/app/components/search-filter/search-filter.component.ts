import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { API_URL } from '../../config';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';

interface Community {
  _id: string;
  name: string;
}

interface Discussion {
  _id: string;
  title: string;
}

interface Resource {
  _id: string;
  title: string;
  tags: string[];
}

@Component({
  selector: 'app-search-filter',
  templateUrl: './search-filter.component.html',
  styleUrls: ['./search-filter.component.css'],
})
export class SearchFilterComponent implements OnInit {
  searchForm: FormGroup;
  allCommunities: Community[] = [];
  allDiscussions: Discussion[] = [];
  allResources: Resource[] = [];
  filteredCommunities: Community[] = [];
  filteredDiscussions: Discussion[] = [];
  filteredResources: Resource[] = [];

  constructor(private fb: FormBuilder, private http: HttpClient) {
    this.searchForm = this.fb.group({
      query: [''],
    });
  }

  ngOnInit(): void {
    // Fetch all data
    this.fetchAllData();

    // Real-time search
    this.searchForm
      .get('query')
      ?.valueChanges.pipe(debounceTime(300), distinctUntilChanged())
      .subscribe((query) => {
        this.filterResults(query);
      });
  }

  fetchAllData(): void {
    // Fetch all communities
    this.http.get<{data:Community[]}>(`${API_URL}/communities`).subscribe({
      next: (response) => {
        this.allCommunities = response.data;
      },
      error: (err) => {
        console.error('Failed to fetch communities:', err);
      },
    });

    // Fetch all discussions
    this.http.get<{data:Discussion[]}>(`${API_URL}/discussions`).subscribe({
      next: (response) => {
        this.allDiscussions = response.data;
      },
      error: (err) => {
        console.error('Failed to fetch discussions:', err);
      },
    });

    // Fetch all resources
    this.http.get<{data:Resource[]}>(`${API_URL}/resources`).subscribe({
      next: (response) => {
        this.allResources = response.data;
      },
      error: (err) => {
        console.error('Failed to fetch resources:', err);
      },
    });
  }

  filterResults(query: string): void {
    const lowerCaseQuery = query.toLowerCase();

    // Filter communities
    this.filteredCommunities = this.allCommunities.filter((community) =>
      community.name.toLowerCase().includes(lowerCaseQuery)
    );

    // Filter discussions
    this.filteredDiscussions = this.allDiscussions.filter((discussion) =>
      discussion.title.toLowerCase().includes(lowerCaseQuery)
    );

    // Filter resources
    this.filteredResources = this.allResources.filter(
      (resource) =>
        resource.title.toLowerCase().includes(lowerCaseQuery) ||
        resource.tags.some((tag) => tag.toLowerCase().includes(lowerCaseQuery))
    );
  }
}