import { TestBed } from '@angular/core/testing';

import { EmbeddedMemoryService } from './embedded-memory.service';

describe('EmbeddedMemoryService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: EmbeddedMemoryService = TestBed.get(EmbeddedMemoryService);
    expect(service).toBeTruthy();
  });
});
