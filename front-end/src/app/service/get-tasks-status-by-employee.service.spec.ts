import { TestBed } from '@angular/core/testing';
import { environment, urls } from 'src/environments/environment';
import { GetTasksStatusByEmployeeService } from './get-tasks-status-by-employee.service';

describe('GetTasksStatusByEmployeeService', () => {
  let service: GetTasksStatusByEmployeeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GetTasksStatusByEmployeeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
