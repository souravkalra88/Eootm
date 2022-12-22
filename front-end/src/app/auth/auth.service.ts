import { Injectable } from '@angular/core';
import { CognitoUserPool } from 'amazon-cognito-identity-js';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})

export class AuthService {

  constructor() { }
  result :any
  isLoggedIn(): boolean {
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

        environment.idToken  = environment.idToken  == '' ? session.getRefreshToken().getToken() : session.getAccessToken().getJwtToken() ;
        // this.result =  session.getAccessToken().payload

        // console.log(this.result)
        isAuth = session.isValid();
      })
    }
    return isAuth;
  }
}