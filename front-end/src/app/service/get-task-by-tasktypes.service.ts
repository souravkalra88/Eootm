import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class GetTaskByTasktypesService {

  // url = "https://qfqfrz1b62.execute-api.ap-south-1.amazonaws.com/tasks_by_tasktype";
  constructor(private http : HttpClient) {

   }

   allTaskByTaskType(url:string ):Observable<any> {{
    console.log(environment.idToken);
    console.log(url);
    // this.url = this.url + '/' + type;
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' +environment.idToken,
      
    })
     
    return this.http.get(url,  { headers: headers })
   }
  }
}
