import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from 'src/app/services/authentication.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  constructor(private authentication: AuthenticationService) {}

  ngOnInit() {
    this.authentication.getAllUsers().subscribe((values) => {
      console.log(values);
    });
  }
}
