import { Component, EventEmitter, Output } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import {   CognitoUserPool } from 'amazon-cognito-identity-js';
import { OnInit } from '@angular/core';
import { SwitchHeaderService } from '../service/switch-header.service';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})

export class HeaderComponent implements OnInit {
  userName: string = environment.currentUser;
  imgSrc:string = "assets/img/home_logo.svg";
  role:string= "";

  currentView:string= ""

  constructor(public router: Router,private switchHeader:SwitchHeaderService) {
    this.currentView = switchHeader.getCurrentView()
  }
  ngOnInit(): void {
    this.role = environment.role 
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

  reloadHome(): void{
    const currentRoute = this.router.url;



    this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {

        this.router.navigate([currentRoute]);  

    });
  }
  switchView(view:string):void {
    this.switchHeader.setView(view);
    if(view === 'admin_view'){
      this.router.navigate(["admin-view/home"])
    }
    console.log(this.switchHeader.getCurrentView())
  }
}
