import { Component, OnInit } from '@angular/core';

import { AddUserService } from '../service/add-user.service';
import { Router } from '@angular/router';
import { ChangeUserAttrService } from '../service/change-user-attr.service';
import { GetAllUsersService } from '../service/get-all-usersservice';
import { SwitchRoleService } from '../service/switch-role.service';

@Component({
  selector: 'app-admins',
  templateUrl: './admins.component.html',
  styleUrls: ['./admins.component.css']
})
export class AdminsComponent implements OnInit {
  
  allAdminsList: any[] = []
  allNonAdminsList: any[] = []
  allUsers:any[] = []
  
  addAdminPopUp:boolean = false
  constructor(private router:Router,private getAllUsers: GetAllUsersService, private addUser: AddUserService, private removeUserFromAdmin: ChangeUserAttrService, private changeRole: SwitchRoleService) { }


  ngOnInit(): void {
    this.getAllUsers.getAllUsers().subscribe((responsedata: any) => {
      
     
      this.allUsers = responsedata
      responsedata.forEach((val: any) => {
        if (val['custom:role'] === 'admin') {
          this.allAdminsList.push(val);
        }
        else {
          this.allNonAdminsList.push(val);
        }
      })
      
        
     
    })
  
   }

  
   openAddAdmin(){
    this.addAdminPopUp = true;
   }
   closeAddAdmin(){
    this.addAdminPopUp = false;
   }
}