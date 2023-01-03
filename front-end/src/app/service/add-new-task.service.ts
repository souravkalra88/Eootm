import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment, urls } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AddNewTaskService {
  url = "";
  constructor(private http : HttpClient) { }

  addNewTask(body:any):Observable<any>{
    this.url = urls.addNewTask
    
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' +environment.idToken
    })
  
   
    return  this.http.post(this.url,body,{ headers: headers })
    
  }  
}
