import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from  '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ContentCardComponent } from './content-card/content-card.component';
import { ContentSectionComponent } from './content-section/content-section.component';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { TrailerBannerComponent } from './trailer-banner/trailer-banner.component';
import { HeaderComponent } from './header/header.component';
import { ShowPageComponent } from './show-page/show-page.component';
import { ActorCardComponent } from './actor-card/actor-card.component';
import { HttpClientModule } from '@angular/common/http';
import { AuthenticationService } from './services/authentification.service';
import { AuthInterceptor } from './services/auth.interceptor';
import { NewShowBannerComponent } from './new-show-banner/new-show-banner.component';
import { HomePageComponent } from './home-page/home-page.component';
import { CastSectionComponent } from './cast-section/cast-section.component';
import { CastPageComponent } from './cast-page/cast-page.component';
import { ReturnBtnComponent } from './return-btn/return-btn.component';
import { EpisodesSectionComponent } from './episodes-section/episodes-section.component';
import { SeasonDropdownComponent } from './season-dropdown/season-dropdown.component';
import { SwiperModule } from 'swiper/angular';
import { EpisodeCardComponent } from './episode-card/episode-card.component';
import { EpisodePageComponent } from './episode-page/episode-page.component';
import { PosterSectionComponent } from './poster-section/poster-section.component';
import { PosterPageComponent } from './poster-page/poster-page.component';
import { PosterGridComponent } from './poster-grid/poster-grid.component';
import { UserPageComponent } from './user-page/user-page.component';
import { CommentComponent } from './comment/comment.component';
import { CommentPageComponent } from './comment-page/comment-page.component';
import { CommentSectionComponent } from './comment-section/comment-section.component';
import { AdminPageComponent } from './admin-page/admin-page.component';
import { ActorNameFormatPipe } from './pipes/actor-name-format.pipe';
import { NotFoundComponent } from './not-found/not-found.component';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    ContentCardComponent,
    ContentSectionComponent,
    RegisterComponent,
    LoginComponent,
    TrailerBannerComponent,
    HeaderComponent,
    ShowPageComponent,
    ActorCardComponent,
    NewShowBannerComponent,
    HomePageComponent,
    CastSectionComponent,
    CastPageComponent,
    ReturnBtnComponent,
    EpisodesSectionComponent,
    SeasonDropdownComponent,
    EpisodeCardComponent,
    EpisodePageComponent,
    PosterSectionComponent,
    PosterPageComponent,
    PosterGridComponent,
    UserPageComponent,
    CommentComponent,
    CommentPageComponent,
    CommentSectionComponent,
    AdminPageComponent,
    ActorNameFormatPipe,
    NotFoundComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    SwiperModule,
    ReactiveFormsModule
  ],
  providers: [AuthenticationService, AuthInterceptor
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
