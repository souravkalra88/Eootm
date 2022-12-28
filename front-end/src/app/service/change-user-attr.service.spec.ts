import { TestBed } from '@angular/core/testing';

import { ChangeUserAttrService } from './change-user-attr.service';

describe('ChangeUserAttrService', () => {
  let service: ChangeUserAttrService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ChangeUserAttrService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
