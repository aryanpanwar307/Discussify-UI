import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { API_URL } from '../config';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  private apiUrl = API_URL + '/notifications';

  constructor(private http: HttpClient) {}

  getNotifications(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }
}
