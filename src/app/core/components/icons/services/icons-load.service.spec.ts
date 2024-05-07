import { TestBed } from '@angular/core/testing';

import { IconsLoadService } from './icons-load.service';

describe('IconsLoadService', () => {
  let service: IconsLoadService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(IconsLoadService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
