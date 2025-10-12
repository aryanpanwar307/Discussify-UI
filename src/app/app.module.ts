import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LandingPageComponent } from './components/landing-page/landing-page.component';
import { CreateCommunityComponent } from './components/community-create/community-create.component';
import { CommunityDetailsComponent } from './components/community-details/community-details.component';
import { SearchFilterComponent } from './components/search-filter/search-filter.component';
import { ResourceUploadComponent } from './components/resource-upload/resource-upload.component';
import { NotificationsComponent } from './components/notifications/notifications.component';
import { AdminPanelComponent } from './components/admin-panel/admin-panel.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { HomeComponent } from './components/home/home.component';
import { DiscussionComponent } from './components/discussion/discussion.component';
import { UpdateProfileComponent } from './components/update-profile/update-profile.component';
import { CreateDiscussionComponent } from './components/discussion-create/discussion-create.component';
import { UpdateCommunityComponent } from './components/update-community/update-community.component';

@NgModule({
  declarations: [
    AppComponent,
    LandingPageComponent,
    CreateCommunityComponent,
    CommunityDetailsComponent,
    SearchFilterComponent,
    ResourceUploadComponent,
    NotificationsComponent,
    AdminPanelComponent,
    LoginComponent,
    RegisterComponent,
    HomeComponent,
    DiscussionComponent,
    UpdateProfileComponent,
    CreateDiscussionComponent,
    UpdateCommunityComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

