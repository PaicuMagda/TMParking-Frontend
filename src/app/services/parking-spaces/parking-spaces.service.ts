import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ParkingPlacesService {
  constructor() {}

  parcari = [
    {
      nume: 'Parcare Centrală',
      autor: 'John Doe',
      zona: 'Centru oraș',
      dataDeschiderii: '15 iulie 2023',
      locuriDisponibile: 100,
    },
    {
      nume: 'Parcare Aeroport',
      autor: 'Jane Smith',
      zona: 'Aeroport internațional',
      dataDeschiderii: '10 martie 2022',
      locuriDisponibile: 500,
    },
    {
      nume: 'Parcare Subterană',
      autor: 'Alex Johnson',
      zona: 'Centru oraș',
      dataDeschiderii: '3 noiembrie 2021',
      locuriDisponibile: 200,
    },
    {
      nume: 'Parcare Centrală',
      autor: 'John Doe',
      zona: 'Centru oraș',
      dataDeschiderii: '15 iulie 2023',
      locuriDisponibile: 100,
    },
    {
      nume: 'Parcare Aeroport',
      autor: 'Jane Smith',
      zona: 'Aeroport internațional',
      dataDeschiderii: '10 martie 2022',
      locuriDisponibile: 500,
    },
    {
      nume: 'Parcare Subterană',
      autor: 'Alex Johnson',
      zona: 'Centru oraș',
      dataDeschiderii: '3 noiembrie 2021',
      locuriDisponibile: 200,
    },
    {
      nume: 'Parcare Centrală',
      autor: 'John Doe',
      zona: 'Centru oraș',
      dataDeschiderii: '15 iulie 2023',
      locuriDisponibile: 100,
    },
    {
      nume: 'Parcare Aeroport',
      autor: 'Jane Smith',
      zona: 'Aeroport internațional',
      dataDeschiderii: '10 martie 2022',
      locuriDisponibile: 500,
    },
    {
      nume: 'Parcare Subterană',
      autor: 'Alex Johnson',
      zona: 'Centru oraș',
      dataDeschiderii: '3 noiembrie 2021',
      locuriDisponibile: 200,
    },
    {
      nume: 'Parcare Centrală',
      autor: 'John Doe',
      zona: 'Centru oraș',
      dataDeschiderii: '15 iulie 2023',
      locuriDisponibile: 100,
    },
    {
      nume: 'Parcare Aeroport',
      autor: 'Jane Smith',
      zona: 'Aeroport internațional',
      dataDeschiderii: '10 martie 2022',
      locuriDisponibile: 500,
    },
    {
      nume: 'Parcare Subterană',
      autor: 'Alex Johnson',
      zona: 'Centru oraș',
      dataDeschiderii: '3 noiembrie 2021',
      locuriDisponibile: 200,
    },
    {
      nume: 'Parcare Subterană',
      autor: 'Alex Johnson',
      zona: 'Centru oraș',
      dataDeschiderii: '3 noiembrie 2021',
      locuriDisponibile: 200,
    },
    {
      nume: 'Parcare Centrală',
      autor: 'John Doe',
      zona: 'Centru oraș',
      dataDeschiderii: '15 iulie 2023',
      locuriDisponibile: 100,
    },
    {
      nume: 'Parcare Aeroport',
      autor: 'Jane Smith',
      zona: 'Aeroport internațional',
      dataDeschiderii: '10 martie 2022',
      locuriDisponibile: 500,
    },
    {
      nume: 'Parcare Subterană',
      autor: 'Alex Johnson',
      zona: 'Centru oraș',
      dataDeschiderii: '3 noiembrie 2021',
      locuriDisponibile: 200,
    },
    {
      nume: 'Parcare Subterană',
      autor: 'Alex Johnson',
      zona: 'Centru oraș',
      dataDeschiderii: '3 noiembrie 2021',
      locuriDisponibile: 200,
    },
    {
      nume: 'Parcare Centrală',
      autor: 'John Doe',
      zona: 'Centru oraș',
      dataDeschiderii: '15 iulie 2023',
      locuriDisponibile: 100,
    },
    {
      nume: 'Parcare Aeroport',
      autor: 'Jane Smith',
      zona: 'Aeroport internațional',
      dataDeschiderii: '10 martie 2022',
      locuriDisponibile: 500,
    },
    {
      nume: 'Parcare Subterană',
      autor: 'Alex Johnson',
      zona: 'Centru oraș',
      dataDeschiderii: '3 noiembrie 2021',
      locuriDisponibile: 200,
    },
    {
      nume: 'Parcare Centrală',
      autor: 'John Doe',
      zona: 'Centru oraș',
      dataDeschiderii: '15 iulie 2023',
      locuriDisponibile: 100,
    },
    {
      nume: 'Parcare Aeroport',
      autor: 'Jane Smith',
      zona: 'Aeroport internațional',
      dataDeschiderii: '10 martie 2022',
      locuriDisponibile: 500,
    },
  ];

  getParcari() {
    return this.parcari;
  }
}
