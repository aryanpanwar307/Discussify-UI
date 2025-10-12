import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LandingPageComponent } from './components/landing-page/landing-page.component';
import { CreateCommunityComponent } from './components/community-create/community-create.component';
import { CommunityDetailsComponent } from './components/community-details/community-details.component';
import { SearchFilterComponent } from './components/search-filter/search-filter.component';
import { ResourceUploadComponent } from './components/resource-upload/resource-upload.component';
import { NotificationsComponent } from './components/notifications/notifications.component';
import { AdminPanelComponent } from './components/admin-panel/admin-panel.component';
import { DiscussionComponent } from './components/discussion/discussion.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { HomeComponent } from './components/home/home.component';
import { AuthGuard } from './guards/auth.guard';
import { CreateDiscussionComponent } from './components/discussion-create/discussion-create.component';
import { UpdateProfileComponent } from './components/update-profile/update-profile.component';
import { UpdateCommunityComponent } from './components/update-community/update-community.component';


const routes: Routes = [
  { path: '', component: LandingPageComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'home', component: HomeComponent, canActivate: [AuthGuard] },
  { path: 'communities', component: CreateCommunityComponent, canActivate: [AuthGuard] },
  { path: 'communities/:communityId', component: CommunityDetailsComponent, canActivate: [AuthGuard] },
  { path: 'discussion/:communityId', component: CreateDiscussionComponent,canActivate: [AuthGuard] },
  { path: 'discussions/:discussionId', component: DiscussionComponent , canActivate: [AuthGuard]},
  { path: 'search', component: SearchFilterComponent, canActivate: [AuthGuard] },
  { path: 'upload', component: ResourceUploadComponent, canActivate: [AuthGuard]},
  { path: 'notifications', component: NotificationsComponent, canActivate: [AuthGuard] },
  { path: 'updateProfile', component: UpdateProfileComponent},
  { path: 'updateCommunity', component: UpdateCommunityComponent},
  { path: 'admin', component: AdminPanelComponent, canActivate: [AuthGuard] },
  { path: '**', redirectTo: '/home' } // Redirect to home for unknown routes
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
