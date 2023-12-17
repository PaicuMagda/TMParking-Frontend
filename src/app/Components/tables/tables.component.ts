import { Component, OnInit } from '@angular/core';
import { TabTitle } from 'src/app/enums/tab-title';

@Component({
  selector: 'app-tables',
  templateUrl: './tables.component.html',
  styleUrls: ['./tables.component.scss'],
})
export class TablesComponent implements OnInit {
  activeTable: string = 'Parking Spaces';

  constructor() {}

  parseEnumToArray(enumObject: any) {
    return Object.values(enumObject);
  }

  ngOnInit() {}
}
