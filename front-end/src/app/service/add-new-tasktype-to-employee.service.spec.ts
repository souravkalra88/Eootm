import { TestBed } from '@angular/core/testing';

import { NewTasktypeToEmployeeService } from './add-new-tasktype-to-employee.service';

describe('NewTasktypeToEmployeeService', () => {
  let service: NewTasktypeToEmployeeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NewTasktypeToEmployeeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
