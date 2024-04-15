import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ParkingSpaceReservationsTableComponent } from './parking-space-reservations-table.component';

describe('ParkingSpaceReservationsTableComponent', () => {
  let component: ParkingSpaceReservationsTableComponent;
  let fixture: ComponentFixture<ParkingSpaceReservationsTableComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ParkingSpaceReservationsTableComponent]
    });
    fixture = TestBed.createComponent(ParkingSpaceReservationsTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
