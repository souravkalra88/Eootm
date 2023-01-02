import { TestBed } from '@angular/core/testing';

import { UpdateCompletionStatusService } from './update-completion-status.service';

describe('UpdateCompletionStatusService', () => {
  let service: UpdateCompletionStatusService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UpdateCompletionStatusService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
