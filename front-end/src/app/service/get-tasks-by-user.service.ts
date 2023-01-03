import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { urls, environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class GetTasksByUserService {

  url : string= "";
  constructor(private http : HttpClient) {

   }

   allTaskByTaskType(emp_id:string ):Observable<any> {{
 
     this.url = urls.getUserTasksById  + emp_id ;
     
    
    
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' +environment.idToken,
      
    })
     
    return this.http.get(this.url,  { headers: headers })
   }
  }
}
