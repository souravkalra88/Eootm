import { TestBed } from '@angular/core/testing';

import { GetAllTasktypeAssignedUsersService } from './get-all-tasktype-assigned-users.service';

describe('GetAllTasktypeAssignedUsersService', () => {
  let service: GetAllTasktypeAssignedUsersService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GetAllTasktypeAssignedUsersService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
