import {
  ChangeDetectorRef,
  Component,
  ElementRef,
  ViewChild,
} from '@angular/core';

@Component({
  selector: 'app-google-maps',
  templateUrl: './google-maps.component.html',
  styleUrls: ['./google-maps.component.scss'],
})
export class GoogleMapsComponent {
  @ViewChild('mapContainer', { static: false }) mapContainer: ElementRef;
  center: google.maps.LatLngLiteral;
  zoom = 6;
  map: google.maps.Map;
  userMarker: google.maps.Marker;

  ngOnInit() {
    // Inițializarea centrului hărții
    this.center = { lat: 22.2736308, lng: 70.7512555 };

    // Crearea hărții și asocierea ei cu elementul mapContainer
    this.map = new google.maps.Map(this.mapContainer.nativeElement, {
      center: this.center,
      zoom: this.zoom,
    });
  }

  constructor(private cdRef: ChangeDetectorRef) {}

  getCurrentLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const userLocation = {
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          };
          // Adăugarea sau actualizarea marker-ului utilizatorului
          if (!this.userMarker) {
            this.userMarker = new google.maps.Marker({
              position: userLocation,
              map: this.map,
              title: 'You are here!',
            });
          } else {
            this.userMarker.setPosition(userLocation);
          }
          // Centrarea hărții pe locația utilizatorului
          this.map.setCenter(userLocation);
        },
        (error) => {
          console.error('Eroare la obținerea locației:', error);
        }
      );
    } else {
      console.error('Geolocația nu este suportată de acest browser.');
    }
  }

  ngAfterViewInit() {
    this.cdRef.detectChanges();
    // Restul codului aici
  }
}
