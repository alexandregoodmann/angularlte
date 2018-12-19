import { TestBed } from '@angular/core/testing';

import { MotivoService } from './motivo.service';

describe('MotivoService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: MotivoService = TestBed.get(MotivoService);
    expect(service).toBeTruthy();
  });
});
