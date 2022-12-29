import { Injectable } from '@angular/core';
import { CognitoUserPool } from 'amazon-cognito-identity-js';
import { environment } from 'src/environments/environment';
import { SwitchHeaderService } from '../service/switch-header.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})

export class AuthService {

  constructor(private switchView : SwitchHeaderService , private router : Router) { }
  result :any
  isLoggedIn(checkForRole : string): boolean {
    var isAuth = false;

    let poolData = {
      UserPoolId: environment.cognitoUserPoolId,
      ClientId: environment.cognitoAppClientId
    };

    var userPool = new CognitoUserPool(poolData);
    var cognitoUser = userPool.getCurrentUser();
    
    

    if (cognitoUser != null) {
      cognitoUser.getSession((err: any, session: any) => {
        if (err) {
          alert(err.message || JSON.stringify(err));
        }

        if(session!=null)
        environment.idToken  = environment.idToken  == '' ? session.getRefreshToken().getToken() : session.getAccessToken().getJwtToken() ;
        
        var currentUsername = cognitoUser?.getSignInUserSession()?.getIdToken().payload['name'] 
        environment.role =  cognitoUser?.getSignInUserSession()?.getIdToken().payload['role']
        environment.currentUser = currentUsername
        
        
        if(environment.role === 'admin' ) isAuth = true;
        else{
          if(checkForRole === 'user')
          if (cognitoUser?.getSignInUserSession()?.getIdToken().payload['custom:log_in_access'] === 'yes') isAuth = session.isValid();
          console.log(environment.role)
  
        }
       
        
      })
    }
    return isAuth;
  }
}