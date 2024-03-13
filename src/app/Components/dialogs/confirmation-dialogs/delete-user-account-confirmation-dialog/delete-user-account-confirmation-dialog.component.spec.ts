import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeleteUserAccountConfirmationDialogComponent } from './delete-user-account-confirmation-dialog.component';

describe('DeleteUserAccountConfirmationDialogComponent', () => {
  let component: DeleteUserAccountConfirmationDialogComponent;
  let fixture: ComponentFixture<DeleteUserAccountConfirmationDialogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DeleteUserAccountConfirmationDialogComponent]
    });
    fixture = TestBed.createComponent(DeleteUserAccountConfirmationDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
