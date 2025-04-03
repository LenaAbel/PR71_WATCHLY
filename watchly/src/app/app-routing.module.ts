import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { ShowPageComponent } from './show-page/show-page.component';
import { HomePageComponent } from './home-page/home-page.component';
import { CastPageComponent } from './cast-page/cast-page.component';
import { EpisodePageComponent } from './episode-page/episode-page.component';
import { PosterPageComponent } from './poster-page/poster-page.component';
import { UserPageComponent } from './user-page/user-page.component';
import { CommentPageComponent } from './comment-page/comment-page.component';
import { AdminPageComponent } from './admin-page/admin-page.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { ResearchPageComponent } from './research-page/research-page.component';

const routes: Routes = [
  {path: 'login', component: LoginComponent},
  {path: 'register', component: RegisterComponent},
  {path: 'profile', component: UserPageComponent},
  {path: 'user/:id', component: UserPageComponent},
  {path: 'user/:id/comments', component: CommentPageComponent},
  {path: 'admin', component: AdminPageComponent},
  {path: 'error/404', component: NotFoundComponent},
  {path: 'research', component: ResearchPageComponent},
  {path: ':id', component: ShowPageComponent},
  {path: ':id', component: ShowPageComponent},
  {path: ':id/episode/:episodeId', component: ShowPageComponent},
  {path: '', component: HomePageComponent},
  {path: ':id/casting', component: CastPageComponent},
  {path: ':id/episodes', component: EpisodePageComponent},
  {path: ':id/comments', component: CommentPageComponent},
  {path: ':id/posters', component: PosterPageComponent},
  {path: '**', redirectTo: 'error/404'}, //le query params sera donnée dans la route no worries
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
