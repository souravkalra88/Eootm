import { Component, OnInit } from '@angular/core';

import { AddUserService } from '../service/add-user.service';

@Component({
  selector: 'app-admins',
  templateUrl: './admins.component.html',
  styleUrls: ['./admins.component.css']
})
export class AdminsComponent implements OnInit {
  
  allAdminsList: any[] = []
  allNonAdminsList: any[] = []
  allUsers:any[] = []
  constructor( ) { }
  addAdminPopUp:boolean = false
  ngOnInit(): void {
  
   }

  
   openAddAdmin(){
    this.addAdminPopUp = true;
   }
   closeAddAdmin(){
    this.addAdminPopUp = false;
   }
}