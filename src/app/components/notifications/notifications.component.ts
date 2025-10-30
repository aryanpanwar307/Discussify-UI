import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthService } from '../../services/auth.service';
import { API_URL } from '../../config';

interface Notification {
  _id: string;
  type: string;
  message: string;
  isRead: boolean;
  createdAt: string;
}

@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.css'],
})
export class NotificationsComponent implements OnInit {
  notifications: Notification[] = [];

  constructor(private http: HttpClient, private authService: AuthService) { }

  ngOnInit(): void {
    this.fetchNotifications();
  }

  fetchNotifications(): void {
    const token = localStorage.getItem('token')
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`)
  this.http.get<{data:Notification[]}>(`${API_URL}/notifications`, { headers }).subscribe({
      next: (response) => {
        this.notifications = response.data;
      },
      error: (err) => {
        console.error('Failed to fetch notifications:', err);
      },
    });
  }

  markAsRead(notificationId: string): void {
    const token = localStorage.getItem('token')
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`)
  this.http.put(`${API_URL}/notifications/${notificationId}/mark-as-read`, {}, { headers }).subscribe({
      next: () => {
        // Update the notification's isRead status locally
        const notification = this.notifications.find((n) => n._id === notificationId);
        if (notification) {
          notification.isRead = true;
        }
      },
      error: (err) => {
        console.error('Failed to mark notification as read:', err);
      },
    });
  }
}
