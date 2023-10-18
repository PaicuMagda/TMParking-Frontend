import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddNewParkingSpaceDialogComponent } from './add-new-parking-space-dialog.component';

describe('AddNewParkingSpaceDialogComponent', () => {
  let component: AddNewParkingSpaceDialogComponent;
  let fixture: ComponentFixture<AddNewParkingSpaceDialogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddNewParkingSpaceDialogComponent]
    });
    fixture = TestBed.createComponent(AddNewParkingSpaceDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
