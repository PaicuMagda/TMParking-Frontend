import { Component, OnInit } from '@angular/core';
import { TabTitle } from 'src/app/enums/tab-title';
import * as pdfMake from 'pdfmake/build/pdfmake';
import * as pdfFonts from 'pdfmake/build/vfs_fonts';
(pdfMake as any).vfs = pdfFonts.pdfMake.vfs;
import { saveAs } from 'file-saver';

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

  generatePdf(): void {
    let docDefinition = {
      content: ['This ia a sample PDF printed with pdfMake.'],
    };
    const pdfDoc = pdfMake.createPdf(docDefinition);

    pdfDoc.getBlob((blob: Blob) => {
      saveAs(blob, 'sample.pdf');
    });
  }

  ngOnInit() {
    this.activeTable = this.parseEnumToArray(TabTitle);
  }
}
