import { TestBed } from '@angular/core/testing';

import { AddTaskTypeService } from './add-task-type.service';

describe('AddTaskTypeService', () => {
  let service: AddTaskTypeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AddTaskTypeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
