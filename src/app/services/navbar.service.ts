import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class NavbarService {
  constructor() {}

  private isOpened = new BehaviorSubject<boolean>(false);
  private isOpenDetailsParkingSpace = new BehaviorSubject<boolean>(false);

  toggleSidenav() {
    this.isOpened.next(true);
  }

  gettoggleSidenavValue() {
    return this.isOpened.asObservable();
  }

  openDetailParkingSpace() {
    this.isOpenDetailsParkingSpace.next(true);
  }

  getOpenDetailsParkingSpaceValue() {
    return this.isOpenDetailsParkingSpace.asObservable();
  }
}
