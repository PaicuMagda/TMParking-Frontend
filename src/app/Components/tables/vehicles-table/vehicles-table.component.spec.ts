import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VehiclesTableComponent } from './vehicles-table.component';

describe('VehiclesTableComponent', () => {
  let component: VehiclesTableComponent;
  let fixture: ComponentFixture<VehiclesTableComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [VehiclesTableComponent]
    });
    fixture = TestBed.createComponent(VehiclesTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
