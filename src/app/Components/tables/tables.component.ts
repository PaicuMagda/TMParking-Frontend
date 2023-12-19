import { Component, OnInit } from '@angular/core';
import { TabTitle } from 'src/app/enums/tab-title';

@Component({
  selector: 'app-tables',
  templateUrl: './tables.component.html',
  styleUrls: ['./tables.component.scss'],
})
export class TablesComponent implements OnInit {
  activeTable: string[] = [];
  activeTabIndex: number = 0;

  constructor() {}

  updateTableNumber(activeTabIndex: number) {
    this.activeTabIndex = activeTabIndex;
  }

  parseEnumToArray(enumObj: Object) {
    return Object.values(enumObj);
  }

  ngOnInit() {
    this.activeTable = this.parseEnumToArray(TabTitle);
  }
}
