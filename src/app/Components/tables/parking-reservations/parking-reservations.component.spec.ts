import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ParkingReservationsComponent } from './parking-reservations.component';

describe('ParkingReservationsComponent', () => {
  let component: ParkingReservationsComponent;
  let fixture: ComponentFixture<ParkingReservationsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ParkingReservationsComponent]
    });
    fixture = TestBed.createComponent(ParkingReservationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
