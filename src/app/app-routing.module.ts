import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { AuthenticationGuard } from './msal-guard.service';
import { SignupComponent } from './signup/signup.component';

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full', canActivate: [AuthenticationGuard] },
  {path:'home',component:HomeComponent, canActivate: [AuthenticationGuard]},
  {path:'login',component:LoginComponent},
  {path:'signup',component:SignupComponent},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
