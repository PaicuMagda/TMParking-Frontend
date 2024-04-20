import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReservationsChartsComponent } from './reservations-charts.component';

describe('ReservationsChartsComponent', () => {
  let component: ReservationsChartsComponent;
  let fixture: ComponentFixture<ReservationsChartsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ReservationsChartsComponent]
    });
    fixture = TestBed.createComponent(ReservationsChartsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
