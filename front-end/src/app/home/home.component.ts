import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { GetAllTaskTypesService } from '../service/get-all-task-types.service';
import { Subject } from 'rxjs';
import { GetAllTasktypeAssignedUsersService } from '../service/get-all-tasktype-assigned-users.service';
import { Router } from '@angular/router';


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
  all_task_type_assigned_users:any[]=[];
  this_week_employees:any[]=[];
  constructor(private router : Router ,private http : HttpClient, private GetAllTasktypeAssignedUsers : GetAllTasktypeAssignedUsersService){
    // this.lis=[];
}
ngOnInit(): void{
  this.GetAllTasktypeAssignedUsers.get_all_tasktype_assigned_users().subscribe((responsedata:any)=>{
    this.all_task_type_assigned_users=responsedata;
    this.dtTrigger.next(void 0);
    var users_for_the_week:any[]=[];
    
    this.all_task_type_assigned_users.forEach( (value) => {
      const date_today_obj=new Date()             //current date
      var date_after_seven_days:Date=new Date();
      const tasktype_date=new Date(value["date"]) // tasktype date
      // console.log("date for ",value["name"],"is",value["date"])
      date_after_seven_days=new Date(date_after_seven_days.setDate(date_after_seven_days.getDate() + 7));
      if((date_after_seven_days>tasktype_date)&&(tasktype_date>date_today_obj)){
        console.log("pushed")
            this.this_week_employees.push(value)
                }
      }
      )
  //    console.log(this.all_task_type_assigned_users)
      });
    }  
    manage(emp:any){
      this.router.navigate(['/admin-view/task-list/manage'],{
        state:{employee:emp}
      });
    }
}
