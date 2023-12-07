import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ParkingSpaceSearchComponent } from './parking-space-search.component';

describe('ParkingSpaceSearchComponent', () => {
  let component: ParkingSpaceSearchComponent;
  let fixture: ComponentFixture<ParkingSpaceSearchComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ParkingSpaceSearchComponent]
    });
    fixture = TestBed.createComponent(ParkingSpaceSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
