import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { AllEmployeesData } from 'src/app/models/EmployessDataModel';
import { GetAllEmployeesService } from 'src/app/service/get-all-employees.service';
import { GetAllTasktypeAssignedUsersService } from 'src/app/service/get-all-tasktype-assigned-users.service';
import { GetTaskByTasktypesService } from 'src/app/service/get-task-by-tasktypes.service';

@Component({
  selector: 'app-manage-emp-task-list',
  templateUrl: './manage-emp-task-list.component.html',
  styleUrls: ['./manage-emp-task-list.component.css']
})
export class ManageEmpTaskListComponent implements OnInit {
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<any> = new Subject<any>();
  AllEmployees:any;
  index: number = 0
  isChecked: boolean = false;
  currentEmployee:AllEmployeesData 
  currentEmployeeTaskTypes : AllEmployeesData[] = [];
  eTasks:any
  constructor(private router: Router,private GetAllEmployees:GetAllEmployeesService, private get_all_tasktype_assigned_users:GetAllTasktypeAssignedUsersService,private getTaskByType: GetTaskByTasktypesService){
    var tname = this.router.getCurrentNavigation()?.extras.state?.['employee']
   if(this.router.getCurrentNavigation()?.extras.state?.['index']!== undefined) this.index = this.router.getCurrentNavigation()?.extras.state?.['index']
    this.currentEmployee = tname
    console.log(this.currentEmployee)
  }


  ngOnInit() {
    this.get_all_tasktype_assigned_users.get_all_tasktype_assigned_users().subscribe((responsedata: any) => {
      this.AllEmployees=responsedata;
      console.log(this.AllEmployees);
      if(this.currentEmployee === undefined) this.currentEmployee = responsedata[0];
      // this.dtTrigger.next(void 0);
      // console.log(responsedata);
      // console.log(responsedata)
      // console.log(this.currentEmployee)
     // let val : any
      for(var val of responsedata)
       {
       if(val.name === this.currentEmployee.name) this.currentEmployeeTaskTypes.push(val);
      }
      console.log(this.currentEmployeeTaskTypes)
    
      var url = "";
        url += "/" + this.currentEmployee.tasktype.toLowerCase()
        this.getTaskByType.allTaskByTaskType(url).subscribe((data: any) => {
  
          this.eTasks = data;
          
     //     console.log(this.eTasks)
          this.dtTrigger.next(void 0);
        });
      console.log(this.currentEmployee);

        // this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
      
    })
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 5,
      lengthMenu: [5, 10, 15, 20],
    };   
  } 
  checkValue(val:any){
    if(val===true){

    }
  }
 
  switchType(obj:number):void {

  console.log(obj)
  this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
        this.router.navigate(['/admin-view/task-list/manage'],{
          state:{employee:this.AllEmployees[obj] , index:obj}
        });  
    });
  }


  isCheckedInv(event:any , task:any){
    this.isChecked = event.value;
    console.log(event)
  }
}
