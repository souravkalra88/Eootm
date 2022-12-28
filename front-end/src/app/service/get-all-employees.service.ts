import { Injectable } from '@angular/core';
import {HttpClient,HttpHeaders} from '@angular/common/http';
import { Observable } from 'rxjs/internal/Observable';
import { environment, urls } from 'src/environments/environment';
import { AllEmployeesData } from '../models/EmployessDataModel';
 

@Injectable({
  providedIn: 'root'
})
export class GetAllUsersService {
  url = "";
  constructor(private http : HttpClient) {
   }
   allUsersData():Observable<any> {{
    // console.log(environment.idToken);
    this.url = urls.getAllUsers
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' +environment.idToken
    })
    return this.http.get<AllUsersData>(this.url, { headers: headers })
   }
  }
}
