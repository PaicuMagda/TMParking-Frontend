import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VehiclesChartsComponent } from './vehicles-charts.component';

describe('VehiclesChartsComponent', () => {
  let component: VehiclesChartsComponent;
  let fixture: ComponentFixture<VehiclesChartsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [VehiclesChartsComponent]
    });
    fixture = TestBed.createComponent(VehiclesChartsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
