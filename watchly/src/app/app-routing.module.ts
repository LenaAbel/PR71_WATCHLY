import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { ShowPageComponent } from './show-page/show-page.component';
import { HomePageComponent } from './home-page/home-page.component';
import { CastPageComponent } from './cast-page/cast-page.component';
import { EpisodePageComponent } from './episode-page/episode-page.component';
import { PosterPageComponent } from './poster-page/poster-page.component';

const routes: Routes = [
  {path: 'login', component: LoginComponent},
  {path: 'register', component: RegisterComponent},
  {path: 'series/:id', component: ShowPageComponent},
  {path: 'movies/:id', component: ShowPageComponent},
  {path: '', component: HomePageComponent},
  {path: ':id/casting', component: CastPageComponent},
  {path: ':id/episodes', component: EpisodePageComponent},
  {path: 'profile', component: LoginComponent},
  {path: ':id/posters', component:PosterPageComponent} // to change
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
