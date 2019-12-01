import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {HomeComponent} from './home/home.component';
import {ReviewsComponent} from './reviews/reviews.component';
import { LoginComponent } from './login/login.component';
import { SongsComponent } from './songs/songs.component';
import { AuthenticationGuard } from 'src/server/authentication/Authentication-Guard';
import { AddReviewComponent } from './add-review/add-review.component';
import { AddSongComponent } from './add-song/add-song.component';
import { AdminComponent } from './admin/admin.component';
import { AdminAuthenticationGuard } from 'src/server/authentication/Admin-Authentication-Guard';
import { PrivacyPolicyComponent } from './privacy-policy/privacy-policy.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'reviews', component: ReviewsComponent },
  { path: 'login', component: LoginComponent },
  { path: 'songs', component: SongsComponent},
  { path: 'addreview', component: AddReviewComponent, canActivate: [AuthenticationGuard]},
  { path: 'addsong', component: AddSongComponent, canActivate: [AuthenticationGuard]},
  { path: 'admin', component: AdminComponent, canActivate: [AdminAuthenticationGuard]},
  { path: 'privacy', component: PrivacyPolicyComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [AuthenticationGuard, AdminAuthenticationGuard] 
})
export class AppRoutingModule { }
