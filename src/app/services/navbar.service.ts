import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class NavbarService {
  constructor() {}

  private isOpened = new BehaviorSubject<boolean>(false);
  private isOpenDetailsParkingSpace = new BehaviorSubject<boolean>(false);

  toggleSidenav(value: boolean) {
    this.isOpened.next(value);
  }

  gettoggleSidenavValue() {
    return this.isOpened.asObservable();
  }
}
