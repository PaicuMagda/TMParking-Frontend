import { Component, OnInit } from '@angular/core';
import { NavbarService } from 'src/app/services/navbar.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  isOpenDetailsParkingSpace = false;

  constructor(private navbarService: NavbarService) {}

  ngOnInit() {
    this.navbarService.toggleSidenav(false);
  }
}
