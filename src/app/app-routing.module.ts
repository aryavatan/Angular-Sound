import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {HomeComponent} from './home/home.component';
import {ReviewsComponent} from './reviews/reviews.component';
import { LoginComponent } from './login/login.component';
import { SongsComponent } from './songs/songs.component';
import { AuthenticationGuard } from 'src/server/authentication/Authentication-Guard';
import { AddReviewComponent } from './add-review/add-review.component';
import { AddSongComponent } from './add-song/add-song.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'reviews', component: ReviewsComponent },
  { path: 'login', component: LoginComponent },
  { path: 'songs', component: SongsComponent},
  { path: 'addreview', component: AddReviewComponent, canActivate: [AuthenticationGuard]},
  { path: 'addsong', component: AddSongComponent, canActivate: [AuthenticationGuard]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [AuthenticationGuard] 
})
export class AppRoutingModule { }
