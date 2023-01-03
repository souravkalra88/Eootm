import { Injectable } from '@angular/core';
import {HttpClient,HttpHeaders} from '@angular/common/http';
import { Observable } from 'rxjs/internal/Observable';
import { environment, urls } from 'src/environments/environment';
import { AllEmployeesData } from '../models/EmployessDataModel';
 

@Injectable({
  providedIn: 'root'
})
export class GetAllEmployeesService {
  url = "";
  constructor(private http : HttpClient) {
   }
   allEmployeesData():Observable<any> {{
    
    this.url = urls.getAllEmployees
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' +environment.idToken
    })
    return this.http.get<AllEmployeesData>(this.url, { headers: headers })
   }
  }
}
