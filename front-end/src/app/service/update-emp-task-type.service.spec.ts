import { TestBed } from '@angular/core/testing';

import { UpdateEmpTaskTypeService } from './update-emp-task-type.service';

describe('UpdateEmpTaskTypeService', () => {
  let service: UpdateEmpTaskTypeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UpdateEmpTaskTypeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
