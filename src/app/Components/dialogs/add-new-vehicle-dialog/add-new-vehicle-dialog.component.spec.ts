import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddNewVehicleDialogComponent } from './add-new-vehicle-dialog.component';

describe('AddNewVehicleDialogComponent', () => {
  let component: AddNewVehicleDialogComponent;
  let fixture: ComponentFixture<AddNewVehicleDialogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddNewVehicleDialogComponent]
    });
    fixture = TestBed.createComponent(AddNewVehicleDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
