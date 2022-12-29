import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Injectable } from '@angular/core';

import { Observable } from 'rxjs';

import { urls, environment } from 'src/environments/environment';



@Injectable({

  providedIn: 'root'

})
export class GetAllTasktypeAssignedUsersService {

  url = ""

  constructor(private http: HttpClient) { }



  get_all_tasktype_assigned_users():Observable<any>{

    this.url = urls.get_all_tasktype_assigned_users

    const headers = new HttpHeaders({

      'Content-Type': 'application/json',

      'Authorization': 'Bearer ' +environment.idToken

    })

    return this.http.get(this.url, { headers: headers })


}}
