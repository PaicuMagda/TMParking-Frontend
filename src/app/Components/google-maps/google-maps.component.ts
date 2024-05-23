import { AfterViewInit, Component, OnInit } from '@angular/core';
import { PlaceSearchResult } from 'src/app/interfaces/place-search-result';

@Component({
  selector: 'app-google-maps',
  templateUrl: './google-maps.component.html',
  styleUrls: ['./google-maps.component.scss'],
})
export class GoogleMapsComponent implements OnInit, AfterViewInit {
  fromValue: PlaceSearchResult | undefined;
  toValue: PlaceSearchResult | undefined;

  ngAfterViewInit(): void {}

  ngOnInit() {}
}
