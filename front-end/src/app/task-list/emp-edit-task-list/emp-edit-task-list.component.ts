import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { NgForm } from '@angular/forms';
import { GetAllTaskTypesService } from 'src/app/service/get-all-task-types.service';

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

  constructor(private AllTaskTypes : GetAllTaskTypesService) { }

  ngOnInit(): void {
   // this.editEmpTask.DOJ = new Date(this.editEmpTask.DOJ)
   console.log(this.editEmpTask)
    this.AllTaskTypes.allTaskTypesData().subscribe((data: any)=>{
      console.log(data);
      this.taskTypes = data;
      // console.log(this.allEmpsData);
          });  
  }

  Input(form: NgForm) {

    // api call
    this.closePopup();

    console.log(this.editEmpTask)
  }

  closePopup() {
    this.displayStyle = "none";
    
    this.closeClicked.emit(true)
  }

}
