import { Component } from '@angular/core';
import { NavbarService } from './services/navbar.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'TMParking-Frontend';
  opened = false;
  isOpenDetailsParkingSpace = false;

  constructor(private sidenavService: NavbarService) {
    this.sidenavService.gettoggleSidenavValue().subscribe((isOpened) => {
      this.opened = isOpened;
    });
  }
}
