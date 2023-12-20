import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConfirmationParkingSpaceExpiredDialogComponent } from './confirmation-parking-space-expired-dialog.component';

describe('ConfirmationParkingSpaceExpiredDialogComponent', () => {
  let component: ConfirmationParkingSpaceExpiredDialogComponent;
  let fixture: ComponentFixture<ConfirmationParkingSpaceExpiredDialogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ConfirmationParkingSpaceExpiredDialogComponent]
    });
    fixture = TestBed.createComponent(ConfirmationParkingSpaceExpiredDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
