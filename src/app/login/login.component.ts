// import { Component, OnInit } from '@angular/core';
// import * as Msal from 'msal'
// import { MsalService } from '../services/msal.service';
// import {Location} from '@angular/common';

// @Component({
//   selector: 'app-login',
//   templateUrl: './login.component.html',
//   styleUrls: ['./login.component.css']
// })
// export class LoginComponent implements OnInit {
//   applicationConfig: {
//     clientID: string; //This is your client ID
//     //AD
//     defaultAuthority: string; //Default authority value is https://login.microsoftonline.com/common
//     //signup
//     SignInSignUpauthority: string; //Default authority value is https://login.microsoftonline.com/common
//     authority: string;
//     graphScopes: [],
//     graphEndpoint: string;
//   };
//   myMSALObj: Msal.UserAgentApplication;
//   gmailMSALObj: Msal.UserAgentApplication;
//   sinupMSALObj: Msal.UserAgentApplication;

//   constructor(private msalService: MsalService, private location: Location) {
//   }

//   ngOnInit() {
//   }
//   login(): void {
//     this.msalService.login();
// }

// logout(): void {
//     this.msalService.logout();
//     sessionStorage.clear();
// };

// isActive(viewLocation: any): boolean {        
//     return viewLocation === this.location.path();
// };

// isOnline(): boolean {
//     return this.msalService.isOnline();
// };


// }

import { Component, OnInit } from '@angular/core';
import { MSALService } from '../services/msal.service';
import { Router } from '@angular/router';
// import { AuthenticationSandbox } from '../../sandbox/authentication.sandbox';

@Component({
  selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css']
})

export class LoginComponent  {

  user: any;
  token:string;
  constructor(private msalService: MSALService) {
  }

  gmailLogin(){
    const token: string = this.msalService.getTokenFromSession();
    if (token === null || token === undefined || token === 'null') {
      this.msalService.login();
    }
    this.user=this.msalService.getUser();
    console.log(this.user);
    this.token=this.msalService.getTokenFromSession();
  }
  adLogin(){
    const token: string = this.msalService.getTokenFromSession();
    if (token === null || token === undefined || token === 'null') {
      this.msalService.adlogin();
    }
    this.user=this.msalService.getUser();
    console.log(this.user);
    this.token=this.msalService.getTokenFromSession();
  }
  
  // signUpSignIn(){
  //   const token: string = this.msalService.getTokenFromSession();
  //   if (token === null || token === undefined || token === 'null') {
  //     this.msalService.signUpSignIn();
  //   }
  //   this.user=this.msalService.getUser();
  //   console.log(this.user);
  //   this.token=this.msalService.getTokenFromSession();
  // }
  logout(){
    this.msalService.logout();
  }

}
