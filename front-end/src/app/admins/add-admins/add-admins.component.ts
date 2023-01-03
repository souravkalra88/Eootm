import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
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

  @Input() users: any[] = []


  @Output() closeClicked = new EventEmitter();
  displayStyle = "block"
  searchText: string = ""
  constructor(private router: Router, private getAllUsers: GetAllUsersService, private addUser: AddUserService, private removeUserFromAdmin: ChangeUserAttrService, private changeRole: SwitchRoleService) { }


  ngOnInit(): void {


    this.users.forEach((user) => user.selected = false)


  }


  makeAdmin() {

    this.closePopup()
    let idx = 0
    for (let user of this.users) {
     // console.log(user)
      idx = idx + 1;
      if (user.selected === true) {
        this.changeRole.switchToRole(user.sub as string, 'admin').subscribe((result) => {
          if (idx === this.users.length) {



            const currentRoute = this.router.url;
            this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {

              this.router.navigate([currentRoute]);

            });
          }

        })

      }


    }
    this.closePopup()
    //  console.log(this.selectedUser.name);







  }

  closePopup() {
    this.closeClicked.emit()
    this.displayStyle = "none";
  }
}
