import { TestBed } from '@angular/core/testing';

import { SearchInformationService } from './search-information.service';

describe('SearchInformationService', () => {
  let service: SearchInformationService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SearchInformationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
