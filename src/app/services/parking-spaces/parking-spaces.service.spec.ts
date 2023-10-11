import { TestBed } from '@angular/core/testing';

import { ParkingPlacesService } from './parking-spaces.service';

describe('ParkingPlacesService', () => {
  let service: ParkingPlacesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ParkingPlacesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
