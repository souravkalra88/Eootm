import { Injectable } from '@angular/core';
import {HttpClient,HttpHeaders} from '@angular/common/http';
import { Observable } from 'rxjs/internal/Observable';
import { environment, urls } from 'src/environments/environment';
 

@Injectable({
  providedIn: 'root'
})
export class AddNewTasktypeToEmployeeService {
  url = "";
  constructor(private http : HttpClient) {
   }
   add_new_tasktype_to_employee(body:any):Observable<any> {{
  
    this.url = urls.add_new_tasktype_to_employee
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' +environment.idToken

    })
    return this.http.post(this.url,body, { headers: headers })
   }
  }
}
