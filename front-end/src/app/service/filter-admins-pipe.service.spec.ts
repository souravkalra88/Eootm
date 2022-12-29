import { TestBed } from '@angular/core/testing';

import { FilterAdminsPipeService } from './filter-admins-pipe.service';

describe('FilterAdminsPipeService', () => {
  let service: FilterAdminsPipeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FilterAdminsPipeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
