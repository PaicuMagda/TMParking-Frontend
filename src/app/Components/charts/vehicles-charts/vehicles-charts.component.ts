import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';

@Component({
  selector: 'app-vehicles-charts',
  templateUrl: './vehicles-charts.component.html',
  styleUrls: ['./vehicles-charts.component.scss'],
})
export class VehiclesChartsComponent implements AfterViewInit {
  @ViewChild('chart') pieChart: ElementRef;

  drawChart = () => {
    const data = google.visualization.arrayToDataTable([
      ['Task', 'Hours per Day'],
      ['Work', 11],
      ['Eat', 2],
      ['Commute', 2],
      ['Watch TV', 2],
      ['Sleep', 7],
    ]);

    const options = {
      colors: [
        '#e6194B',
        '#3cb44b',
        '#ffe119',
        '#4363d8',
        '#f58231',
        '#911eb4',
      ],
    };

    const chart = new google.visualization.ComboChart(
      this.pieChart.nativeElement
    );

    chart.draw(data, options);
  };

  ngAfterViewInit() {
    google.charts.load('current', { packages: ['corechart'] });
    google.charts.setOnLoadCallback(this.drawChart);
  }
}
