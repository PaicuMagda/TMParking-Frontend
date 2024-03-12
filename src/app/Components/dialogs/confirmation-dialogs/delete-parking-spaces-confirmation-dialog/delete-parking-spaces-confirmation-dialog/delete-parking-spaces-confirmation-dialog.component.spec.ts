import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteParkingSpacesConfirmationDialogComponent } from './delete-parking-spaces-confirmation-dialog.component';

describe('DeleteParkingSpacesConfirmationDialogComponent', () => {
  let component: DeleteParkingSpacesConfirmationDialogComponent;
  let fixture: ComponentFixture<DeleteParkingSpacesConfirmationDialogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DeleteParkingSpacesConfirmationDialogComponent]
    });
    fixture = TestBed.createComponent(DeleteParkingSpacesConfirmationDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
