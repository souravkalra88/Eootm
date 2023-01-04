import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { AllEmployeesData } from 'src/app/models/EmployessDataModel';
import { GetAllEmployeesService } from 'src/app/service/get-all-employees.service';
import { GetAllTasktypeAssignedUsersService } from 'src/app/service/get-all-tasktype-assigned-users.service';
import { GetTaskByTasktypesService } from 'src/app/service/get-task-by-tasktypes.service';
import { GetTasksStatusByEmployeeService } from 'src/app/service/get-tasks-status-by-employee.service';
import { UpdateCompletionStatusService } from 'src/app/service/update-completion-status.service';

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
  currentEmployee:any 
  completion_Status : boolean = true;
  currentEmployeeTaskTypes : AllEmployeesData[] = [];
  eTasks:any
  TasksCompleteionStatusByEmployee:any[] = [];
  constructor(private statusByEmpId:GetTasksStatusByEmployeeService, private get_all_tasktype_assigned_users:GetAllTasktypeAssignedUsersService ,private router: Router,private GetAllEmployees:GetAllEmployeesService,private UpdateCompletionStatus: UpdateCompletionStatusService ,private getTaskByType: GetTaskByTasktypesService){
    var tname = this.router.getCurrentNavigation()?.extras.state?.['employee']
    
    
    this.currentEmployee = tname
    this.index = this.router.getCurrentNavigation()?.extras.state?.['index']
 
  }


  ngOnInit() {
    this.get_all_tasktype_assigned_users.get_all_tasktype_assigned_users().subscribe((responsedata: any) => {
      this.AllEmployees=responsedata;
     
      if(this.currentEmployee === undefined) this.currentEmployee = responsedata[0];
      

  for(let i=0 ; i<responsedata.length ; i++){
    if(this.index === undefined)
    if(responsedata[i].name === this.currentEmployee.name){ this.index = i;break;}
      
    
  }
  this.statusByEmpId.getTasksStatusByEmpId(this.currentEmployee.empID).subscribe((data: any) =>{
    this.TasksCompleteionStatusByEmployee = data;
   
  })
     
    
      var url = "";
        url += "/" + this.currentEmployee.tasktype.toLowerCase()
        this.getTaskByType.allTaskByTaskType(url).subscribe((data: any) => {
  
          this.eTasks = data;
          console.log(this.eTasks)
          this.eTasks.forEach((task:any) => task.due = this.assignDue(task.due_duration) )
          this.eTasks.sort((a:any,b:any) => a.due-b.due)
         
          this.dtTrigger.next(void 0);
        });
    

        
      
    })

    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 5,
      lengthMenu: [5, 10, 15, 20],
    };   
  } 
  
  Checked(val:any , event:any){
    
    
    let taskID=val['sk']
    var status = ""
    
    if(this.TasksCompleteionStatusByEmployee [val['sk']] === 'incomplete')status = "complete"
    else status = "incomplete"
    if(this.TasksCompleteionStatusByEmployee [val['sk']] !== undefined) this.TasksCompleteionStatusByEmployee[taskID] = status
    let empID=this.currentEmployee.empID
    
    
   
   empID = empID.split("#")
   empID = empID[0]
    let body={
      "empID":empID,
      "taskID":taskID,
      "completion_status":status
    }

    this.UpdateCompletionStatus.update_completion_status(body).subscribe((responsedata: any) => {
      


    })
  }
  
 
  switchType(obj:number):void {

  this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
        this.router.navigate(['/admin-view/task-list/manage'],{
          state:{employee:this.AllEmployees[obj] , index:obj}
        });  
    });
  }


  isCheckedInv(event:any , task:any){
    this.isChecked = event.value;
  
  }
  assignDue(duration:any):number{
    let number:number = duration.slice(0,-1) as number;
    let dueType:string = duration.substring(duration.length - 1) ;
    let idx = 0;
    if(dueType === 'b') return idx - number ;
    return number
    
  }
}
