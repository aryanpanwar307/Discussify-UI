import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Resource } from '../models/resource.model';
import { API_URL } from '../config';

@Injectable({
  providedIn: 'root'
})
export class ResourceService {
  private apiUrl = API_URL + '/resources';

  constructor(private http: HttpClient) {}

  uploadResource(formData: FormData): Observable<Resource> {
    return this.http.post<Resource>(this.apiUrl, formData);
  }
}
