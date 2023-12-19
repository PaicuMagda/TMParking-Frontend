import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ParkingSpaceTableComponent } from './parking-space-table.component';

describe('ParkingSpaceTableComponent', () => {
  let component: ParkingSpaceTableComponent;
  let fixture: ComponentFixture<ParkingSpaceTableComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ParkingSpaceTableComponent]
    });
    fixture = TestBed.createComponent(ParkingSpaceTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
