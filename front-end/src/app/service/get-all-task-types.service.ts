import { Injectable } from '@angular/core';
import {HttpClient,HttpHeaders} from '@angular/common/http';
import { Observable } from 'rxjs/internal/Observable';
import { environment, urls } from 'src/environments/environment';
 
@Injectable({
  providedIn: 'root'
})
export class GetAllTaskTypesService {
 url:string = "";
  constructor(private http : HttpClient) {

   }

   allTaskTypesData():Observable<any> {{
    this.url = urls.getAllTasks
    console.log(environment.idToken);
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',  
      'Authorization': 'Bearer ' +environment.idToken,
      
    })
    return this.http.get(this.url, { headers: headers })
   }
  }
}  