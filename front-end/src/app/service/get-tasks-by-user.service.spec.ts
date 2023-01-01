import { TestBed } from '@angular/core/testing';

import { GetTasksByUserService } from './get-tasks-by-user.service';

describe('GetTasksByUserService', () => {
  let service: GetTasksByUserService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GetTasksByUserService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
