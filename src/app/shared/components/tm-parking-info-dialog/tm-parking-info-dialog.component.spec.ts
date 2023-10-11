import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TmParkingInfoDialogComponent } from './tm-parking-info-dialog.component';

describe('TmParkingInfoDialogComponent', () => {
  let component: TmParkingInfoDialogComponent;
  let fixture: ComponentFixture<TmParkingInfoDialogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TmParkingInfoDialogComponent]
    });
    fixture = TestBed.createComponent(TmParkingInfoDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
