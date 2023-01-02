import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment, urls } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UpdateCompletionStatusService {
  url = "";
  constructor(private http : HttpClient) {
   }

   update_completion_status(body: any):Observable<any> {{
    this.url = urls.updateCompletionStatus
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
