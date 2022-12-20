import { Injectable } from '@angular/core';
import {HttpClient,HttpHeaders} from '@angular/common/http';
import { Observable } from 'rxjs/internal/Observable';
import { environment } from 'src/environments/environment';
 
@Injectable({
  providedIn: 'root'
})
export class GetAllTaskTypesService {
url = "https://qfqfrz1b62.execute-api.ap-south-1.amazonaws.com/task-type/getAll";
  constructor(private http : HttpClient) {

   }

   allTaskTypesData():Observable<any> {{
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' +environment.idToken
    })
    return this.http.get(this.url, { headers: headers })
   }
  }
}  
