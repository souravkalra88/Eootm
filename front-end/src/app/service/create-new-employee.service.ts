import { Injectable } from '@angular/core';
import {HttpClient,HttpHeaders} from '@angular/common/http';
import { Observable } from 'rxjs/internal/Observable';
import { environment, urls } from 'src/environments/environment';
 

@Injectable({
  providedIn: 'root'
})
export class CreateNewEmployee {
  url = "";
  constructor(private http : HttpClient) {
   }
   createEmployee(body:any):Observable<any> {{
    // console.log(environment.idToken);
    this.url = urls.createNewEmployee
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' +environment.idToken

    })
    return this.http.post(this.url,body, { headers: headers })
   }
  }
}
