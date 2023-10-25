import { Component, Input, OnInit } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { AuthenticationService } from 'src/app/services/authentication.service';
import { NavbarService } from 'src/app/services/navbar.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  opened = false;

  constructor(
    private authentication: AuthenticationService,
    private sidenavService: NavbarService
  ) {
    this.sidenavService.getOpenClose().subscribe((isOpened) => {
      this.opened = isOpened;
    });
  }

  ngOnInit() {
    this.authentication.getAllUsers().subscribe((values) => {
      console.log(values);
    });
  }
}
