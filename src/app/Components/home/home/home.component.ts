import { Component, OnInit } from '@angular/core';
import { NavbarService } from 'src/app/services/navbar.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  opened = false;
  isOpenDetailsParkingSpace = false;

  constructor(private sidenavService: NavbarService) {
    this.sidenavService.gettoggleSidenavValue().subscribe((isOpened) => {
      this.opened = isOpened;
    });
    this.sidenavService
      .getOpenDetailsParkingSpaceValue()
      .subscribe((isOpenDetailsParkingSpace) => {
        this.isOpenDetailsParkingSpace = isOpenDetailsParkingSpace;
      });
  }

  ngOnInit() {}
}
