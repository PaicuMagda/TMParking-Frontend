import { Component, OnInit } from '@angular/core';
import { TimisoaraAreas } from 'src/app/interfaces/timisoara-areas';
import { ParkingPlacesService } from 'src/app/services/parking-spaces.service';

@Component({
  selector: 'app-parking-space-search',
  templateUrl: './parking-space-search.component.html',
  styleUrls: ['./parking-space-search.component.scss'],
})
export class ParkingSpaceSearchComponent implements OnInit {
  constructor(private parkingSpacesService: ParkingPlacesService) {}

  areas: TimisoaraAreas[] = [];

  ngOnInit(): void {
    this.parkingSpacesService.getTimisoaraAreas().subscribe((data) => {
      data.forEach((area) => {
        area.isSelected = false;
      });
      this.areas = data;
    });
  }

  isButtonAreaSelected(area: TimisoaraAreas): void {
    area.isSelected = !area.isSelected;
  }
}
