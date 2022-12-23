import { Injectable } from '@angular/core';
import {HttpClient,HttpHeaders} from '@angular/common/http';
import { Observable } from 'rxjs/internal/Observable';
import { environment } from 'src/environments/environment';
 

@Injectable({
  providedIn: 'root'
})
export class CreateNewEmployee {
  url = "https://qfqfrz1b62.execute-api.ap-south-1.amazonaws.com/newemp";
  constructor(private http : HttpClient) {
   }
   createEmployee(body:any):Observable<any> {{
    // console.log(environment.idToken);
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' +environment.idToken

    })
    return this.http.post(this.url,body, { headers: headers })
   }
  }
}
