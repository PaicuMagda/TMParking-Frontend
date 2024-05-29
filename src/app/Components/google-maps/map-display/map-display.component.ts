import { Component, Input, OnChanges, ViewChild } from '@angular/core';
import { GoogleMap, MapDirectionsService } from '@angular/google-maps';
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
  @ViewChild('map', { static: true })
  map!: GoogleMap;
  directionsResult: google.maps.DirectionsResult | undefined;
  zoom = 5;
  distance: string | undefined;
  markerPosition: google.maps.LatLng | undefined;

  constructor(private directionsService: MapDirectionsService) {}

  ngOnChanges() {
    const fromLocation = this.from?.location;
    const toLocation = this.to?.location;

    if (fromLocation && toLocation) {
      this.getDirections(fromLocation, toLocation);
    } else if (fromLocation) {
      this.goToLocation(fromLocation);
    } else if (toLocation) {
      this.goToLocation(toLocation);
    }
  }

  goToLocation(location: google.maps.LatLng) {
    this.markerPosition = location;
    this.map.panTo(location);
    this.zoom = 17;
    this.directionsResult = undefined;
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
        this.markerPosition = undefined;
      });
  }
}
