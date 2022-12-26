import { Component, EventEmitter, Output } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import {   CognitoUserPool } from 'amazon-cognito-identity-js';
import { OnInit } from '@angular/core';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})

export class HeaderComponent implements OnInit {
  userName: string = environment.currentUser;
  imgSrc:string = "assets/img/home_logo.svg";
 



  constructor(public router: Router) {}
  ngOnInit(): void {
    
  }
;


  logOut(): void {
    let poolData = {
      UserPoolId: environment.cognitoUserPoolId,
      ClientId: environment.cognitoAppClientId
    };
    let userPool = new CognitoUserPool(poolData);
    let cognitoUser = userPool.getCurrentUser();
    cognitoUser?.signOut();
    this.router.navigate([""])
  }
}
