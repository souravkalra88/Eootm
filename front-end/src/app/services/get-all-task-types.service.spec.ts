import { TestBed } from '@angular/core/testing';

import { GetAllTaskTypesService } from './get-all-task-types.service';

describe('GetAllTaskTypesService', () => {
  let service: GetAllTaskTypesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GetAllTaskTypesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
