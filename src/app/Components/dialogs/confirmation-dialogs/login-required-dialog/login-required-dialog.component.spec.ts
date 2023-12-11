import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginRequiredDialogComponent } from './login-required-dialog.component';

describe('LoginRequiredDialogComponent', () => {
  let component: LoginRequiredDialogComponent;
  let fixture: ComponentFixture<LoginRequiredDialogComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [LoginRequiredDialogComponent]
    });
    fixture = TestBed.createComponent(LoginRequiredDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
