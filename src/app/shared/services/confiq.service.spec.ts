import { TestBed } from '@angular/core/testing';

import { ConfiqService } from './confiq.service';

describe('ConfiqService', () => {
  let service: ConfiqService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ConfiqService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
