import { Component, OnInit } from '@angular/core';
import { GetAllAdminsService } from '../service/get-all-admins.service';
import { AddUserService } from '../service/add-user.service';

@Component({
  selector: 'app-admins',
  templateUrl: './admins.component.html',
  styleUrls: ['./admins.component.css']
})
export class AdminsComponent implements OnInit {
  

  constructor( private addUser : AddUserService) { }

  ngOnInit(): void {
    // const body = {
    //   "name": "Sourav Kalra",
  
    //   "password": "Pass@123",
    //   "email": "sk@gmail.com",
    //   "gender": "male",
    //   "phone_number": "+919417820873",
    //   "role": "admin"
     
    // }

    //  this.addUser.addUser(body);
  }
}