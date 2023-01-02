import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { GetAllTaskTypesService } from 'src/app/service/get-all-task-types.service';
import { GetAllUsersService } from 'src/app/service/get-all-usersservice';
import { UpdateEmpTaskTypeService } from 'src/app/service/update-emp-task-type.service';

@Component({
  selector: 'app-emp-edit-task-list',
  templateUrl: './emp-edit-task-list.component.html',
  styleUrls: ['./emp-edit-task-list.component.css']
})
export class EmpEditTaskListComponent implements OnInit {
  @Input() editEmpTask: any
  @Input()  AllEmployees:any
  @Output() closeClicked = new EventEmitter<boolean>()
  @Output() saveClicked = new EventEmitter<boolean>()
  displayStyle: string = "block"
  taskTypes:any;
  // allUsers:any;

  constructor(private router : Router , private updateEmpTaskType : UpdateEmpTaskTypeService ,private getAllUsers : GetAllUsersService , private AllTaskTypes : GetAllTaskTypesService) { }

  ngOnInit(): void {
   // this.editEmpTask.DOJ = new Date(this.editEmpTask.DOJ)
   console.log(this.editEmpTask)
    this.AllTaskTypes.allTaskTypesData().subscribe((data: any)=>{
      console.log(data);
      this.taskTypes = data;
      // console.log(this.allEmpsData);
          });  

          // this.getAllUsers.getAllUsers().subscribe((responsedata: any) => {
            
          //   this.allUsers = responsedata
          //   // this.allEmployees.forEach((val: any) => {
          //   //   if (val['custom:role'] === 'user')  {
          //   //      this.allUsers.push(val);
          //   //   }
          //   // })
          // }
          //   )
  }

  Input(form: NgForm) {

    // api call
    this.closePopup();
    this.updateEmpTaskType.update_employee_tasktype(this.editEmpTask).subscribe((data)=>{
      console.log(data);
    })
    const currentRoute = this.router.url;



    this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {

        this.router.navigate([currentRoute]);  

    });

    console.log(this.editEmpTask)
  }

  closePopup() {
    this.displayStyle = "none";
    
    this.closeClicked.emit(true)
  }

}
