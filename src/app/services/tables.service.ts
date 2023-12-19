import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TablesService {
  constructor() {}

  private dataSubjectFromTable = new Subject<string>();

  sendDataFromTable(data: string) {
    this.dataSubjectFromTable.next(data);
  }

  getDataFromTable() {
    return this.dataSubjectFromTable.asObservable();
  }
}
