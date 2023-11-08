import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyProfileDialogComponent } from './my-profile-dialog.component';

describe('MyProfileDialogComponent', () => {
  let component: MyProfileDialogComponent;
  let fixture: ComponentFixture<MyProfileDialogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MyProfileDialogComponent]
    });
    fixture = TestBed.createComponent(MyProfileDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
