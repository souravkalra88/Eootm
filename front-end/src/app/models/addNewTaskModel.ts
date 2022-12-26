import { environment } from "src/environments/environment";

export class newTask{
    taskTitle: any;
    taskDescription: any;
    taskOwnedBy: any = environment.currentUser
    taskDuration: any;
    dueDays:any;
    daysType:any
}