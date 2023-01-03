import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { CognitoUserPool,CognitoUserAttribute } from 'amazon-cognito-identity-js';

import { urls, environment } from 'src/environments/environment';
import { User } from '../models/UserModel';

@Injectable({
  providedIn: 'root'
})
export class UpdateUserService {

  constructor(private http: HttpClient) { }
  url = ""
  updateUser(user : User): Observable<any> {
    this.url = urls.updateUser
    
    var attributeList = [];
    let nUser:any = {
      "name" : user.name,
      "email" : user.email,
      
      "gender" : user.gender,
      "phone_number" : user.phone_number,
      
      "profile" : user.profile,
      
      "custom:log_in_access" : user["custom:log_in_access"]
    }
  
    for(let key in nUser){
      let attrData = {
        Name: key,
        Value: nUser[key]
      }
     
      attributeList.push(attrData)
    }

    var body = {
      "username": user.username,
      "attributes": attributeList
    }


    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + environment.idToken
    })
  
 return this.http.put(this.url, body, { headers: headers })

  }
}