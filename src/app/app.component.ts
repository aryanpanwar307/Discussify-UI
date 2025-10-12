import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Discussify';

  constructor(public authService: AuthService, public router: Router) {
    console.log(authService.isAdmin() , 'Admin')
  }

  

  // Check if the user is logged in
  // get isLoggedIn(): boolean {
  //   return this.authService.isLoggedIn();
  // }



  isSidebarOpen = false;
  toggleSidebar(): void {
    this.isSidebarOpen = !this.isSidebarOpen;
  }
  // Logout the user
  logout(): void {
    this.authService.logout();
    this.router.navigate(['/home']);
  }
}
