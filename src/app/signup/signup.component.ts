import { Component, OnInit } from '@angular/core';
import { MSALService } from '../services/msal.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  user: any;
  token:string;
  constructor(private msalService: MSALService) {
  }
  
  ngOnInit() {
  }

  
  gmailSignUp(){
    const token: string = this.msalService.getTokenFromSession();
    if (token === null || token === undefined || token === 'null') {
      this.msalService.gmailSignUp();
    }
    this.user=this.msalService.getUser();
    console.log(this.user);
    this.token=this.msalService.getTokenFromSession();
  }
  logout(){
    this.msalService.logout();
  }
}