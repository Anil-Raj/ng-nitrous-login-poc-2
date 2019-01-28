import { Injectable } from '@angular/core';
import { UserAgentApplication } from 'msal';

@Injectable()
export class MSALService {

    private applicationConfig: any = {
        clientID: '3527c3fd-ae76-4ff7-bd1f-27da69f11bb9', //This is your client ID
        defaultAuthority: "https://login.microsoftonline.com/common",  //Default authority value is https://login.microsoftonline.com/common
        b2cScopes: ["user.read"],
        authorityPrefix: "https://login.microsoftonline.com/tfp/neutimu.onmicrosoft.com/",
        gmailSignUpAuthority: "B2C_1_gmail-signup",
        gmailSignInAuthority:'B2C_1_gmail-signin',
        ADSignInAuthority:'https://login.microsoftonline.com/common',
        SignUpSignInAuthority:'B2C_1_signupsignin2',
        redirectUrl: 'http://localhost:4200'
        
    };

    private app: any;
    public user: any;
    constructor() {
        this.app = new UserAgentApplication(this.applicationConfig.clientID, this.applicationConfig.authorityPrefix + this.applicationConfig.gmailSignInAuthority,
            (errorDesc, token, error, tokenType) => {
                // console.log(token);
            }, { redirectUri: this.applicationConfig.redirectUrl });
        // this.app.redirectUri=this.applicationConfig.redirectUrl;
    }
    public login() {
        let tokenData = '';
        this.app.loginRedirect(["profile"]).then(data => { tokenData = data; });
    }
    public adlogin() {
        let tokenData = '';
        this.app = new UserAgentApplication(this.applicationConfig.clientID, this.applicationConfig.defaultAuthority,
            (errorDesc, token, error, tokenType) => {
                // console.log(token);
            }, { redirectUri: this.applicationConfig.redirectUrl });
        this.app.loginRedirect(this.applicationConfig.b2cScopes).then(data => { tokenData = data; });
    }
    public gmailSignUp() {
        let tokenData = '';
        this.app = new UserAgentApplication(this.applicationConfig.clientID, this.applicationConfig.authorityPrefix + this.applicationConfig.gmailSignUpAuthority,
            (errorDesc, token, error, tokenType) => {
                // console.log(token);
            }, { redirectUri: this.applicationConfig.redirectUrl });
        this.app.loginRedirect(["profile"]).then(data => { tokenData = data; });
    }

    public getUser() {
        const user = this.app.getUser();
        if (user) {
            return user;
        } else {
            return null;
        }
    }

    public logout() {
        this.app.logout();
    }

    public getToken() {
        return this.app.acquireTokenSilent(this.applicationConfig.b2cScopes)
            .then(accessToken => {
                // console.log(accessToken);
                return accessToken;
            }, error => {
                return this.app.acquireTokenPopup(this.applicationConfig.b2cScopes)
                    .then(accessToken => {
                        return accessToken;
                    }, err => {
                        //  console.error(err);
                    });
            });
    }
    public getTokenFromSession(): string {
      const token: string = window.sessionStorage.getItem('msal.idtoken');
      // if (token == null || token === undefined || token=='null' || !tokenNotExpired('msal.idtoken',token)) {
      //     this.msalService.login();
      // }
      // else {
      //     return token;
      // }
      return token;
  }
}
