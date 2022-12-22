import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AddTaskTypeService {
  url = "https://qfqfrz1b62.execute-api.ap-south-1.amazonaws.com/addTaskType";
  constructor(private http : HttpClient) {
   }

   addTaskType(body: any):Observable<any> {{
    // console.log(environment.idToken);
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' +environment.idToken
    })
   console.log(body)
 
    return  this.http.put(this.url,body,{ headers: headers })
   }
  }

}
