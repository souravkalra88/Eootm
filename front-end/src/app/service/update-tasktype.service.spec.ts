import { TestBed } from '@angular/core/testing';

import { UpdateTasktypeService } from './update-tasktype.service';

describe('UpdateTasktypeService', () => {
  let service: UpdateTasktypeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UpdateTasktypeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
