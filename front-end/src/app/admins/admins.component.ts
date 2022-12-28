import { Component, OnInit } from '@angular/core';
import { GetAllAdminsService } from '../service/get-all-usersservice';
import { AddUserService } from '../service/add-user.service';

@Component({
  selector: 'app-admins',
  templateUrl: './admins.component.html',
  styleUrls: ['./admins.component.css']
})
export class AdminsComponent implements OnInit {
  

  constructor( ) { }

  ngOnInit(): void {
  
   }
}