import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment, urls } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SwitchRoleService {

  constructor(private http : HttpClient) { }
  url = ""
  switchToRole(username:string , role:string):Observable<any>{
    this.url = urls.updateUser
    var body = {}
    if(role == "admin"){
      body = {
        "username" : username,
        "attributes" : [
            {
                "Name": "custom:role",
                "Value": role
            },
            {
              "Name": "custom:log_in_access",
              "Value": "yes"
          }
        ]
    }
  
    }
    else {
      body = {
      "username" : username,
      "attributes" : [
          {
              "Name": "custom:role",
              "Value": role
          }
      ]
  }
} 
  const headers = new HttpHeaders({
    'Content-Type': 'application/json',
    'Authorization': 'Bearer ' +environment.idToken
  })
 
 
  return  this.http.put(this.url,body,{ headers: headers })


  }
}
