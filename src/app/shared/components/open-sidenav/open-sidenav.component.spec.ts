import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OpenSidenavComponent } from './open-sidenav.component';

describe('OpenSidenavComponent', () => {
  let component: OpenSidenavComponent;
  let fixture: ComponentFixture<OpenSidenavComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [OpenSidenavComponent]
    });
    fixture = TestBed.createComponent(OpenSidenavComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
