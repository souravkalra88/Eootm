import { TestBed } from '@angular/core/testing';

import { AddNewTaskService } from './add-new-task.service';

describe('AddNewTaskService', () => {
  let service: AddNewTaskService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AddNewTaskService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
