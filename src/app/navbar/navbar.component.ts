import { Component, OnInit } from '@angular/core';
import { MSALService } from '../services/msal.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  user: any;
  modalVisible: boolean;

  constructor(private msalService: MSALService, private router: Router) {
    this.user = this.msalService.getUser();
    console.log(this.user);
    
    
  }


  ngOnInit() {

  }
  getInitials(name) {
    return name.match(/\b(\w)/g).join('');
  }

  logout() {
    this.msalService.logout();
  }
  toggleModal(){
    this.modalVisible = !this.modalVisible;
  }

}
