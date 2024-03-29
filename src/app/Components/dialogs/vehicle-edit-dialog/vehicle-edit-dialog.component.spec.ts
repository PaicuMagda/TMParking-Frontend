import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VehicleEditDialogComponent } from './vehicle-edit-dialog.component';

describe('VehicleEditDialogComponent', () => {
  let component: VehicleEditDialogComponent;
  let fixture: ComponentFixture<VehicleEditDialogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [VehicleEditDialogComponent]
    });
    fixture = TestBed.createComponent(VehicleEditDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
