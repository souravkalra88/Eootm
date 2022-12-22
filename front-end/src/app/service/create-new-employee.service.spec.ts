import { TestBed } from '@angular/core/testing';

import { CreateNewEmployeeService } from './create-new-employee.service';

describe('CreateNewEmployeeService', () => {
  let service: CreateNewEmployeeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CreateNewEmployeeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
