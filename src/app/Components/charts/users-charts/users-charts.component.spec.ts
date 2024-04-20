import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UsersChartsComponent } from './users-charts.component';

describe('UsersChartsComponent', () => {
  let component: UsersChartsComponent;
  let fixture: ComponentFixture<UsersChartsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UsersChartsComponent]
    });
    fixture = TestBed.createComponent(UsersChartsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
