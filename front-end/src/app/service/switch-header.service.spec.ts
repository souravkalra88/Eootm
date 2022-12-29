import { TestBed } from '@angular/core/testing';

import { SwitchHeaderService } from './switch-header.service';

describe('SwitchHeaderService', () => {
  let service: SwitchHeaderService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SwitchHeaderService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
