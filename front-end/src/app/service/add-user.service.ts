import { Injectable } from '@angular/core';
import { environment, urls } from 'src/environments/environment';

import { CognitoUserPool,CognitoUserAttribute } from 'amazon-cognito-identity-js';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class AddUserService {
  url = ""
  constructor(private http:HttpClient) { }
  
  
  addUser(data : any):Observable<any>   {
    this. url = urls.createUser

    var attributeList = [];

    let nUser:any = {
      "name" : data.name,
      "email" : data.email,
      
      "gender" : data.gender,
      "phone_number" : data.phone_number,
      "custom:role" : data.role,
      "profile" : data.profile,

      "custom:log_in_access" : data.log_in_access


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
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' +environment.idToken
    })

    var body = {
      "email" : data.email,
      "attr":attributeList
    }

   return this.http.post(this.url , body , {headers: headers})
    // this.userPool.signUp(data.email, data.password, attributeList, [], (
    //   err,
    //   result
    // ) => {
      
    //   if (err) {
    //     alert(err.message || JSON.stringify(err));
    //     return;
    //   }
    //   res = result
    //   console.log(res)
    // });
    // return res;

  }
}
