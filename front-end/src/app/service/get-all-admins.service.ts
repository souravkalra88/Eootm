import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { urls, environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class GetAllAdminsService {
  url = ""
  constructor(private http: HttpClient) { }

  getAllAdmins():Observable<any>{
    this.url = urls.getAllAdmins
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' +environment.idToken
    })
    return this.http.get(this.url, { headers: headers })

  }

}
