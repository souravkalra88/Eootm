import { TestBed } from '@angular/core/testing';

import { GetAllAdminsService } from './get-all-admins.service';

describe('GetAllAdminsService', () => {
  let service: GetAllAdminsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GetAllAdminsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
