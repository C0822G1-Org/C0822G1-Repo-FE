import { TestBed } from '@angular/core/testing';

class TimetableServiceService {
}

describe('TimetableServiceService', () => {
  let service: TimetableServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TimetableServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
