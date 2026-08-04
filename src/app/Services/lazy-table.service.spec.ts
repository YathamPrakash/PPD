import { TestBed } from '@angular/core/testing';

import { LazyTableService } from './lazy-table.service';

describe('LazyTableService', () => {
  let service: LazyTableService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LazyTableService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
