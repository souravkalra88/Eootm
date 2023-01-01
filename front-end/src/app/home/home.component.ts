import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { GetAllTaskTypesService } from '../service/get-all-task-types.service';
import { Subject } from 'rxjs';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit{
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any>=new Subject<any>();
   sideNavStatus:boolean = false;
  alltasktypes:any;
  
  constructor(private http : HttpClient, private GetAllTasktypeAssignedUsersService : GetAllTasktypeAssignedUsersService){
    // this.lis=[];
}
ngOnInit(): void{
  this.GetAllTasktypeAssignedUsersService.get_all_tasktype_assigned_users().subscribe((responsedata:any)=>{
    this.alltasktypes=responsedata;
    this.dtTrigger.next(void 0);
 //   console.log(this.alltasktypes.body);
  }

  )
}

}
