import { Component, EventEmitter, Output } from '@angular/core';
import { environment } from 'src/environments/environment';
import {   CognitoUserPool } from 'amazon-cognito-identity-js';
import { Router } from '@angular/router';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  UserName: string = environment.currentUser;
  imgSrc = "https://www.watchguard.com/sites/default/files/images/branding/watchguard-logo_0.svg";
  @Output() toogleSidebarForMe: EventEmitter<any> = new EventEmitter();
  constructor(public router: Router) {}
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


  toggleSideBar() {
    this.toogleSidebarForMe.emit();
  }

}
