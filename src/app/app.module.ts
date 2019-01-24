import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { SignupComponent } from './signup/signup.component';
import { MSALService } from './services/msal.service';
import { AuthenticationGuard } from './msal-guard.service';
import { NavbarComponent } from './navbar/navbar.component';
import {MatButtonModule, MatToolbarModule, MatMenuModule} from '@angular/material';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    SignupComponent,
    NavbarComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MatButtonModule,
    MatToolbarModule,
    MatMenuModule
  ],
  providers: [MSALService, AuthenticationGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
