import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Subject } from 'rxjs';
import { AddUserService } from 'src/app/service/add-user.service';
import { ChangeUserAttrService } from 'src/app/service/change-user-attr.service';
import { GetAllUsersService } from 'src/app/service/get-all-usersservice';

import { User } from 'src/app/models/UserModel'
import { SwitchRoleService } from 'src/app/service/switch-role.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-admins-table',
  templateUrl: './admins-table.component.html',
  styleUrls: ['./admins-table.component.css']
})
export class AdminsTableComponent implements OnInit {
  @Input() allAdminsList: any[] = []
  @Input() allNonAdminsList: any[] = []
  @Input() allUsers: any[] = []
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject<any>();


  constructor(private router: Router, private getAllUsers: GetAllUsersService, private addUser: AddUserService, private removeUserFromAdmin: ChangeUserAttrService, private changeRole: SwitchRoleService) { }

  ngOnInit(): void {
   

    
  }
  ngOnChanges(){
    this.dtTrigger.next(void 0);
    this.dtOptions = {

      pagingType: 'full_numbers',

      pageLength: 5,

      lengthMenu: [5, 10, 15, 20]

    };
   
  }

    
  removeAdmin(admin: any): void {

    this.changeRole.switchToRole(admin.sub as string, 'user').subscribe((result) => {
      
      const currentRoute = this.router.url;





      this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {

        this.router.navigate([currentRoute]);

      });

    })


  }
}
