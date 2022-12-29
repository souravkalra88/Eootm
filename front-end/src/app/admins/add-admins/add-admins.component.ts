import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { AddUserService } from 'src/app/service/add-user.service';
import { ChangeUserAttrService } from 'src/app/service/change-user-attr.service';
import { GetAllUsersService } from 'src/app/service/get-all-usersservice';
import { SwitchRoleService } from 'src/app/service/switch-role.service';

@Component({
  selector: 'app-add-admins',
  templateUrl: './add-admins.component.html',
  styleUrls: ['./add-admins.component.css']
})
export class AddAdminsComponent implements OnInit {
  allAdminsList: any[] = []
  allNonAdminsList: any[] = []
  allUsers:any[] = []
  @Input() users:any[] = []
  selectedUser?: any;
@Output() closeClicked = new EventEmitter();
displayStyle="block"
 searchText : string = ""
constructor(private router:Router,private getAllUsers: GetAllUsersService, private addUser: AddUserService, private removeUserFromAdmin: ChangeUserAttrService, private changeRole: SwitchRoleService) { }


  ngOnInit(): void {
   
      console.log(this.users)
      

  }
  onSelect(user: any): void {
    this.selectedUser = user;
  }

  makeAdmin(){
 
    this.closePopup()


    this.changeRole.switchToRole(this.selectedUser.sub as string, 'admin').subscribe((result) => {
      console.log(result);
      const currentRoute = this.router.url;
      console.log(this.selectedUser.name);
      



  this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {

      this.router.navigate([currentRoute]);  

  });

  })


  }
 
  closePopup(){
    this.closeClicked.emit()
    this.displayStyle = "none";
  }
}
