import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { User } from 'src/app/interfaces/user';

@Component({
  selector: 'app-users-charts',
  templateUrl: './users-charts.component.html',
  styleUrls: ['./users-charts.component.scss'],
})
export class UsersChartsComponent implements AfterViewInit {
  @ViewChild('chart') chart: ElementRef;
  selectedChartType: string = 'pie';

  users: User[] = [];

  constructor(private activatedRoute: ActivatedRoute) {}

  getDataForVehiclesRegisteredChart(users: User[]) {
    const data = new google.visualization.DataTable();
    data.addColumn('string', 'User Name');
    data.addColumn('number', 'Number of Vehicles Registered');

    users.forEach((user) => {
      data.addRow([user.fullName, user.vehiclesRegistered]);
    });

    return data;
  }

  getDataForParkingSpacesRegisteredChart(users: User[]) {
    const data = new google.visualization.DataTable();
    data.addColumn('string', 'User Name');
    data.addColumn('number', 'Parking Spaces');

    users.forEach((user) => {
      data.addRow([user.fullName, user.parkingSpacesRegistered]);
    });

    return data;
  }

  getDataForReservationsRegisteredChart(users: User[]) {
    const data = new google.visualization.DataTable();
    // data.addColumn('string', 'User Name');
    // data.addColumn('number', 'Parking Spaces');

    // users.forEach((user) => {
    //   data.addRow([user.fullname, user.reservationsRegistered.length]);
    // });

    return data;
  }

  getDataForChart(users: User[]) {
    const data = new google.visualization.DataTable();
    data.addColumn('string', 'User Name');
    data.addColumn('number', 'Parking Spaces');

    users.forEach((user) => {
      data.addRow([user.fullName, user.vehiclesRegistered.length]);
    });

    return data;
  }

  drawBarChart() {
    const data = this.getDataForParkingSpacesRegisteredChart(this.users);

    const options = {
      colors: [
        '#00674b',
        '#dcdcdc',
        '#004c86',
        '#b1a9c4',
        '#f58231',
        '#911eb4',
      ],
    };

    const chart = new google.visualization.BarChart(this.chart.nativeElement);

    chart.draw(data, options);
  }

  drawLineChart() {
    const data = this.getDataForChart(this.users);

    const options = {
      colors: [
        '#00674b',
        '#dcdcdc',
        '#004c86',
        '#b1a9c4',
        '#f58231',
        '#911eb4',
      ],
    };

    const chart = new google.visualization.LineChart(this.chart.nativeElement);

    chart.draw(data, options);
  }

  drawColumnChart() {
    const data = this.getDataForReservationsRegisteredChart(this.users);

    const options = {
      colors: [
        '#00674b',
        '#dcdcdc',
        '#004c86',
        '#b1a9c4',
        '#f58231',
        '#911eb4',
      ],
    };

    const chart = new google.visualization.ColumnChart(
      this.chart.nativeElement
    );

    chart.draw(data, options);
  }

  drawVehiclesRegisteredCharthart = () => {
    const data = this.getDataForVehiclesRegisteredChart(this.users);
    const options = {
      colors: ['#dcdcdc', '#004c86', '#b1a9c4', '#f58231', '#911eb4'],
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
      case 'pie':
        this.drawVehiclesRegisteredCharthart();
        break;
      default:
        break;
    }
  }

  ngAfterViewInit() {
    google.charts.load('current', { packages: ['corechart'] });
    google.charts.setOnLoadCallback(this.drawVehiclesRegisteredCharthart);
  }

  ngOnInit() {
    this.activatedRoute.data.subscribe(
      (value: any) => (this.users = value.users)
    );
  }
}
