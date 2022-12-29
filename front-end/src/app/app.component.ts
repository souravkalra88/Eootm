import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { AuthService } from './auth/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  ngOnInit(): void {
  }
  
  title = 'EOOMT';
  constructor(private authService: AuthService, private router: Router) {}
  

  // isAuth = this.authService.isLoggedIn()
  
  

 
  sideBarOpen = true;

  sideBarToggler(){
    this.sideBarOpen= !this.sideBarOpen;
  }

}
