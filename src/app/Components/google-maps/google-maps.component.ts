import { AfterViewInit, Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { PlaceSearchResult } from 'src/app/interfaces/place-search-result';

@Component({
  selector: 'app-google-maps',
  templateUrl: './google-maps.component.html',
  styleUrls: ['./google-maps.component.scss'],
})
export class GoogleMapsComponent implements OnInit, AfterViewInit {
  fromValue: PlaceSearchResult | undefined;
  toValue: PlaceSearchResult | undefined = this.data.address;

  constructor(@Inject(MAT_DIALOG_DATA) public data: any) {}
  ngAfterViewInit(): void {}

  ngOnInit() {
    console.log(this.data);
  }
}
