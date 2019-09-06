import { TestBed } from '@angular/core/testing';

import { InMemoryMemberdataService } from './in-memory-memberdata.service';

describe('InMemoryMemberdataService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: InMemoryMemberdataService = TestBed.get(InMemoryMemberdataService);
    expect(service).toBeTruthy();
  });
});
