import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { GetAllEmployeesService } from 'src/app/service/get-all-employees.service';
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
  isChecked: boolean = false;
  currentEmployee:any 
  currentEmployeeTaskTypes : any[] = [];
  eTasks:any
  constructor(private router: Router,private GetAllEmployees:GetAllEmployeesService, private getTaskByType: GetTaskByTasktypesService){
    var tname = this.router.getCurrentNavigation()?.extras.state?.['employee']
   
    this.currentEmployee = tname
  //  console.log(this.employee)
  }


  ngOnInit() {
    this.GetAllEmployees.allEmployeesData().subscribe((responsedata:any)=>{
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
    console.log(this.isChecked);
  }
  switchType(obj:any):void {
    

  //   this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
  //     this.router.navigate(['/task-list/manage'],{
  //       state:{employee:obj}
  //     });  
  // });
    
  }
}
