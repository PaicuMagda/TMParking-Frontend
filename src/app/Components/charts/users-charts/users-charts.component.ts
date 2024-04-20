import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';

@Component({
  selector: 'app-users-charts',
  templateUrl: './users-charts.component.html',
  styleUrls: ['./users-charts.component.scss'],
})
export class UsersChartsComponent implements AfterViewInit {
  @ViewChild('pieChart') pieChart: ElementRef;

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
      title: 'My Daily Activities',
    };

    const chart = new google.visualization.PieChart(
      this.pieChart.nativeElement
    );

    chart.draw(data, options);
  };

  ngAfterViewInit() {
    google.charts.load('current', { packages: ['corechart'] });
    google.charts.setOnLoadCallback(this.drawChart);
  }
}
