import { Injectable } from '@angular/core';

declare var google: any;

@Injectable({
  providedIn: 'root',
})
export class GoogleMapsService {
  private map: any;

  constructor() {}

  initMap(mapElement: HTMLElement, options: any): void {
    this.map = new google.maps.Map(mapElement, options);
  }

  getMap(): any {
    return this.map;
  }
}
