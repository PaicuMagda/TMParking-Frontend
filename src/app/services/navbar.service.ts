import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class NavbarService {
  constructor() {}

  private isOpened = new BehaviorSubject<boolean>(false);
  private showSerach = new Subject<boolean>();
  public showSearch$ = this.showSerach.asObservable();

  showSerachEmitValue(value: boolean) {
    this.showSerach.next(value);
  }

  toggleSidenav(value: boolean) {
    this.isOpened.next(value);
  }

  gettoggleSidenavValue() {
    return this.isOpened.asObservable();
  }
}
