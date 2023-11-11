import { Component, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';

@Component({
  selector: 'app-open-sidenav',
  templateUrl: './open-sidenav.component.html',
  styleUrls: ['./open-sidenav.component.scss'],
})
export class OpenSidenavComponent {
  @ViewChild('sidenav') sidenav!: MatSidenav;

  opened = false;
}
