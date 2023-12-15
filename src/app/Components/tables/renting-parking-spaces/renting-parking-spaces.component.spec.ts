import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RentingParkingSpacesComponent } from './renting-parking-spaces.component';

describe('RentingParkingSpacesComponent', () => {
  let component: RentingParkingSpacesComponent;
  let fixture: ComponentFixture<RentingParkingSpacesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RentingParkingSpacesComponent]
    });
    fixture = TestBed.createComponent(RentingParkingSpacesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
