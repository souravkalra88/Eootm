import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { NgForm } from '@angular/forms';

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
  taskTypes:any=["a","b","c"];

  constructor() { }

  ngOnInit(): void {
   // this.editEmpTask.DOJ = new Date(this.editEmpTask.DOJ)
    
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
