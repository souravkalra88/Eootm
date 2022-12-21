import { Injectable } from '@angular/core';
import {HttpClient,HttpHeaders} from '@angular/common/http';
import { Observable } from 'rxjs/internal/Observable';
import { environment } from 'src/environments/environment';
 

@Injectable({
  providedIn: 'root'
})
export class GetAllEmployeesService {
  url = "https://qfqfrz1b62.execute-api.ap-south-1.amazonaws.com/allemp";
  constructor(private http : HttpClient) {
   }
   allEmployeesData():Observable<any> {{
    console.log(environment.idToken);
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' +environment.idToken
    })
    return this.http.get(this.url, { headers: headers })
   }
  }
}
