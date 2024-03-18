import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ParkingSpacesDialogEditComponent } from './parking-spaces-dialog-edit.component';

describe('ParkingSpacesDialogEditComponent', () => {
  let component: ParkingSpacesDialogEditComponent;
  let fixture: ComponentFixture<ParkingSpacesDialogEditComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ParkingSpacesDialogEditComponent]
    });
    fixture = TestBed.createComponent(ParkingSpacesDialogEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
