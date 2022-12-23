import { TestBed } from '@angular/core/testing';

import { GetTaskByTasktypesService } from './get-task-by-tasktypes.service';

describe('GetTaskByTasktypesService', () => {
  let service: GetTaskByTasktypesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GetTaskByTasktypesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
