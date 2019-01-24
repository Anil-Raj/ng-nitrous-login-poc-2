import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { MSALService } from './services/msal.service';
import { Observable } from 'rxjs';

@Injectable()
export class AuthenticationGuard implements CanActivate {
  isAuthenticated: boolean;

  constructor(private msalService: MSALService, private router: Router) {
    this.isAuthenticated = false;
  }

  public canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    const urlParams = new URLSearchParams(window.location.hash);
    console.log(route.params,urlParams.get('id_token'));
    const aa = urlParams.get('id_token');
    // Setting token in session storage to prevent immediate multiple redirection to AAD login.
    if (aa !== undefined && aa !== null ) {
      window.sessionStorage.setItem('msal.idtoken', urlParams.get('id_token'));
    }

    const token: string = this.msalService.getTokenFromSession();
    if (token === null || token === undefined || token === 'null' || token === '') {
      this.router.navigate(['/login']);
      this.isAuthenticated = false;
    } else {
      this.isAuthenticated = true;
    }
    return this.isAuthenticated;
  }
}
