import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ParkingSpaceDetailsComponent } from './parking-space-details.component';

describe('ParkingSpaceDetailsComponent', () => {
  let component: ParkingSpaceDetailsComponent;
  let fixture: ComponentFixture<ParkingSpaceDetailsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ParkingSpaceDetailsComponent]
    });
    fixture = TestBed.createComponent(ParkingSpaceDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
