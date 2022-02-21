import { TestBed } from '@angular/core/testing';

import { DisplayTableService } from './display-table.service';

describe('DisplayTableService', () => {
  let service: DisplayTableService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DisplayTableService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
