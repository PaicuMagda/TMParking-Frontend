import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class NavbarService {
  constructor() {}

  private isOpened = new BehaviorSubject<boolean>(false);

  openClose() {
    this.isOpened.next(!this.isOpened.value);
  }

  getOpenClose() {
    return this.isOpened.asObservable();
  }
}
