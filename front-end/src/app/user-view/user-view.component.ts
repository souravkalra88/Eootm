import { HttpClient } from '@angular/common/http';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { GetUserTasksService } from '../service/get-user-tasks.service';

@Component({
  selector: 'app-user-view',
  templateUrl: './user-view.component.html',
  styleUrls: ['./user-view.component.css']
})
export class UserViewComponent implements OnInit, OnDestroy{
  constructor(  private http : HttpClient, private router :Router, private getUserTasks: GetUserTasksService){
  }
  
  ngOnInit(): void {

      
  
}

  ngOnDestroy(): void {
  }
  
}
