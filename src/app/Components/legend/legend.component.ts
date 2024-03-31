import { Component, Input, OnInit } from '@angular/core';
import { ParkingStatus } from 'src/app/enums/parking-status';

@Component({
  selector: 'app-legend',
  templateUrl: './legend.component.html',
  styleUrls: ['./legend.component.scss'],
})
export class LegendComponent implements OnInit {
  parkingStatus: any[] = Object.values(ParkingStatus);

  parkingStatusColors: any = {
    occupied: '#0D1C61 ',
    partially_occupied: '#CBCFCF ',
    available: '#25A605  ',
  };

  getParkingStatusColor(status: string): string {
    return this.parkingStatusColors[status];
  }

  ngOnInit() {}
}
