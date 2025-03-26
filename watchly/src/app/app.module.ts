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
import { NewShowBannerComponent } from './new-show-banner/new-show-banner.component';
import { HomePageComponent } from './home-page/home-page.component';
import { CastSectionComponent } from './cast-section/cast-section.component';

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
    CastSectionComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
