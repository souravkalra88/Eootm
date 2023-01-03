import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { AuthenticationDetails,CognitoUserAttribute, CognitoUser, CognitoUserPool } from 'amazon-cognito-identity-js';

@Injectable({
  providedIn: 'root'
})
export class ChangeUserAttrService {


  constructor() { }

  poolData = {
    UserPoolId: environment.cognitoUserPoolId, // Your user pool id here
    ClientId: environment.cognitoAppClientId // Your client id here
  };
  userPool = new CognitoUserPool(this.poolData);

  updateAttr(data:any){
    let userData = { Username: String(data.email_address), Pool: this.userPool };
    var cognitoUser = new CognitoUser(userData);

    var attributeList = [];

    let nUser:any = {
      "name" : data.name,
      "email" : data.email,
      
      "gender" : data.gender,
      "phone_number" : data.phone_number,
      "custom:role" : data.role,
      "custom:date_of_joining" : data.date_of_joining

    }
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


    cognitoUser.updateAttributes(attributeList,(
      err,
      result
    ) => {
      
      if (err) {
        alert(err.message || JSON.stringify(err));
        return;
      }
      res = result
     
    });
  }
  

}
