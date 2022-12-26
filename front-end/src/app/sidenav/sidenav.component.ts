import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.css']
})
export class SidenavComponent {



  list = [
    {
       
      name: 'Home',
      icon: 'fa-solid fa-house',
      route: 'home'
      
    },
    {
       
      name: 'Task Type',
      icon: 'fa-solid fa-bars',
      route: 'task-type'
    },
    {
       
      name: 'Manage ',
      icon: 'fa-solid fa-bars',
      route: 'task-type'
    },
    
    {
      
      name: 'Task List',
      icon: 'fa-solid fa-list-check',
      route: 'task-list'
    },
    {
       
      name: 'Employee',
      icon: 'fa-solid fa-people-roof',
      route: 'employees'
    },{
      
      name: 'Admins',
      icon: 'fa-solid fa-users',
      route: 'admins'
    }
  ]
  

}
