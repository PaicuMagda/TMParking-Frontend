import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteReservationConfirmationDialogComponent } from './delete-reservation-confirmation-dialog.component';

describe('DeleteReservationConfirmationDialogComponent', () => {
  let component: DeleteReservationConfirmationDialogComponent;
  let fixture: ComponentFixture<DeleteReservationConfirmationDialogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DeleteReservationConfirmationDialogComponent]
    });
    fixture = TestBed.createComponent(DeleteReservationConfirmationDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
