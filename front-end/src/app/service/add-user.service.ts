import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

import { CognitoUserPool,CognitoUserAttribute } from 'amazon-cognito-identity-js';
@Injectable({
  providedIn: 'root'
})
export class AddUserService {

  constructor() { }
  poolData = {
    UserPoolId: environment.cognitoUserPoolId, // Your user pool id here
    ClientId: environment.cognitoAppClientId // Your client id here
  };
  userPool = new CognitoUserPool(this.poolData);
  addUser(data : any)   {

    var attributeList = [];

    let nUser:any = {
      "name" : data.name,
      "email" : data.email,
      
      "gender" : data.gender,
      "phone_number" : data.phone_number,
      "custom:role" : data.role,
      "profile" : data.profile,
      "custom:date_of_joining" : data.date_of_joining

    }
    // console.log(nUser)
    var res :any
    //api call to get
    for (let key  in nUser) {
      let attrData = {
        Name: key,
        Value: nUser[key]
      }
      let attribute = new CognitoUserAttribute(attrData);
      attributeList.push(attribute)
    }
   
    this.userPool.signUp(data.email, data.password, attributeList, [], (
      err,
      result
    ) => {
      
      if (err) {
        alert(err.message || JSON.stringify(err));
        return;
      }
      res = result
      console.log(res)
    });
    return res;

  }
}
