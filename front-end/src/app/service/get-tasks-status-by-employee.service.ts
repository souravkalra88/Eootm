import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment, urls } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class GetTasksStatusByEmployeeService {

  url : string= "";
  constructor(private http : HttpClient) {

   }
   getTasksStatusByEmpId(empID: string):Observable<any>{
    this.url = urls.getTasksStatusByEmpId + empID 

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' +environment.idToken,
      
    })
     
    return this.http.get(this.url,  { headers: headers })
   }
}
