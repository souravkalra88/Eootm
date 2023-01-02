import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { urls, environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UpdateEmpTaskTypeService {

  url = "";
  constructor(private http : HttpClient) {
   }

   update_employee_tasktype(body: any):Observable<any> {
    this.url = urls.updateEmpTaskType
    // console.log(environment.idToken);
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' +environment.idToken
    })
   console.log(body)
   
    return  this.http.put(this.url,body,{ headers: headers })
   }
}
