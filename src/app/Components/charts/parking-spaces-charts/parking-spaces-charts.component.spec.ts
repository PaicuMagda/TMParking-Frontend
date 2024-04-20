import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ParkingSpacesChartsComponent } from './parking-spaces-charts.component';

describe('ParkingSpacesChartsComponent', () => {
  let component: ParkingSpacesChartsComponent;
  let fixture: ComponentFixture<ParkingSpacesChartsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ParkingSpacesChartsComponent]
    });
    fixture = TestBed.createComponent(ParkingSpacesChartsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
