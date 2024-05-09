import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';

@Component({
  selector: 'app-vehicles-charts',
  templateUrl: './vehicles-charts.component.html',
  styleUrls: ['./vehicles-charts.component.scss'],
})
export class VehiclesChartsComponent implements AfterViewInit {
  @ViewChild('chart') chart: ElementRef;
  selectedChartType: string = '';

  drawBarChart() {
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

    const chart = new google.visualization.BarChart(this.chart.nativeElement);

    chart.draw(data, options);
  }

  drawLineChart() {
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

    const chart = new google.visualization.LineChart(this.chart.nativeElement);

    chart.draw(data, options);
  }

  drawColumnChart() {
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

    const chart = new google.visualization.ColumnChart(
      this.chart.nativeElement
    );

    chart.draw(data, options);
  }

  drawAreaChart() {
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

    const chart = new google.visualization.AreaChart(this.chart.nativeElement);

    chart.draw(data, options);
  }

  drawScatterChart() {
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

    const chart = new google.visualization.ScatterChart(
      this.chart.nativeElement
    );

    chart.draw(data, options);
  }

  drawHistogram() {
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

    const chart = new google.visualization.Histogram(this.chart.nativeElement);

    chart.draw(data, options);
  }

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

    const chart = new google.visualization.PieChart(this.chart.nativeElement);

    chart.draw(data, options);
  };

  changeChartType(chartType: string) {
    this.selectedChartType = chartType;
    switch (chartType) {
      case 'bar':
        this.drawBarChart();
        break;
      case 'line':
        this.drawLineChart();
        break;
      case 'column':
        this.drawColumnChart();
        break;
      case 'area':
        this.drawAreaChart();
        break;
      case 'scatter':
        this.drawScatterChart();
        break;
      case 'histogram':
        this.drawHistogram();
        break;
      default:
        break;
    }
  }

  ngAfterViewInit() {
    google.charts.load('current', { packages: ['corechart'] });
    google.charts.setOnLoadCallback(this.drawChart);
  }
}
