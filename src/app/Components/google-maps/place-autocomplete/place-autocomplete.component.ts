import {
  Component,
  ElementRef,
  EventEmitter,
  Inject,
  Input,
  NgZone,
  Output,
  ViewChild,
} from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { PlaceSearchResult } from 'src/app/interfaces/place-search-result';

@Component({
  selector: 'app-place-autocomplete',
  templateUrl: './place-autocomplete.component.html',
  styleUrls: ['./place-autocomplete.component.scss'],
})
export class PlaceAutocompleteComponent {
  @Input() placeholder = '';
  @ViewChild('inputField') inputField: ElementRef;
  @Output() placeChanged = new EventEmitter<PlaceSearchResult>();

  constructor(
    private ngZone: NgZone,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  autocomplete: google.maps.places.Autocomplete | undefined;

  ngAfterViewInit(): void {
    this.autocomplete = new google.maps.places.Autocomplete(
      this.inputField.nativeElement
    );

    this.autocomplete.addListener('place_changed', () => {
      const place = this.autocomplete?.getPlace();

      const result: PlaceSearchResult = {
        address: this.inputField.nativeElement.value,
        location: place?.geometry?.location,
        name: place?.name,
      };

      this.ngZone.run(() => {
        this.placeChanged.emit(result);
      });
    });
  }
  ngOnInit() {}
}
