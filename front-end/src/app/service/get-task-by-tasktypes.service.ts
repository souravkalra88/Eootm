import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment, urls } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class GetTaskByTasktypesService {

  url : string= "";
  constructor(private http : HttpClient) {

   }

   allTaskByTaskType(type:string ):Observable<any> {{
    console.log(environment.idToken);
     this.url = urls.getTaskByTaskType + type ;
     
    
    
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' +environment.idToken,
      
    })
     
    return this.http.get(this.url,  { headers: headers })
   }
  }
}
