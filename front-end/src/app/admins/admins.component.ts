import { Component, OnInit } from '@angular/core';
import { GetAllAdminsService } from '../service/get-all-admins.service';

@Component({
  selector: 'app-admins',
  templateUrl: './admins.component.html',
  styleUrls: ['./admins.component.css']
})
export class AdminsComponent implements OnInit {
  

  constructor( ) { }

  ngOnInit(): void {
     
  }
}