import { Component, Input, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { GetAllAdminsService } from 'src/app/service/get-all-admins.service';

@Component({
  selector: 'app-admins-table',
  templateUrl: './admins-table.component.html',
  styleUrls: ['./admins-table.component.css']
})
export class AdminsTableComponent  implements OnInit {
  allAdminsList: any[] = []
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any>=new Subject<any>();

  constructor(private getAllAdmins: GetAllAdminsService) { }

  ngOnInit(): void {
    this.getAllAdmins.getAllAdmins().subscribe((responsedata: any) => {
      this.allAdminsList = responsedata;
      // console.log(responsedata);
      this.dtTrigger.next(void 0);
    })

    this.dtOptions = {

      pagingType: 'full_numbers',
  
      pageLength: 5,
  
      lengthMenu: [5,10,15,20] 
  
    }; 
  }

  removeAdmin(admin: any): void {
    const id = admin.sub;
    console.log(id);
  }
}
