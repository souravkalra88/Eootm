import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-task-type-list',
  templateUrl: './task-type-list.component.html',
  styleUrls: ['./task-type-list.component.css']
})
export class TaskTypeListComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit(): void {
  }
  sideBarOpen = true;

  sideBarToggler(){
    this.sideBarOpen= !this.sideBarOpen;
  }


}