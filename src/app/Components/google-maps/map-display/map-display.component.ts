import { Component, Input, OnChanges } from '@angular/core';
import { MapDirectionsService } from '@angular/google-maps';
import { map, tap } from 'rxjs';
import { PlaceSearchResult } from 'src/app/interfaces/place-search-result';

@Component({
  selector: 'app-map-display',
  templateUrl: './map-display.component.html',
  styleUrls: ['./map-display.component.scss'],
})
export class MapDisplayComponent implements OnChanges {
  @Input() from: PlaceSearchResult | undefined;
  @Input() to: PlaceSearchResult | undefined;
  directionsResult: google.maps.DirectionsResult | undefined;
  zoom = 5;
  distance: string | undefined;

  constructor(private directionsService: MapDirectionsService) {}

  ngOnChanges() {
    const fromLocation = this.from?.location;
    const toLocation = this.to?.location;

    if (fromLocation && toLocation) {
      this.getDirections(fromLocation, toLocation);
    }
  }

  getDirections(from: google.maps.LatLng, to: google.maps.LatLng) {
    const request: google.maps.DirectionsRequest = {
      origin: from,
      destination: to,
      travelMode: google.maps.TravelMode.DRIVING,
    };

    this.directionsService
      .route(request)
      .pipe(
        map((res) => res.result),
        tap((result) => {
          if (result && result.routes && result.routes.length > 0) {
            const route = result.routes[0];
            if (route.legs && route.legs.length > 0) {
              const leg = route.legs[0];
              this.distance = leg.distance?.text;
            }
          }
        })
      )
      .subscribe((result) => {
        this.directionsResult = result;
      });
  }
}
