import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BookingParkingLotComponent } from './booking-parking-lot.component';

describe('BookingParkingLotComponent', () => {
  let component: BookingParkingLotComponent;
  let fixture: ComponentFixture<BookingParkingLotComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BookingParkingLotComponent]
    });
    fixture = TestBed.createComponent(BookingParkingLotComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
