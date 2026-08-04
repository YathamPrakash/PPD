import { Injectable } from '@angular/core';
import { of } from 'rxjs';
import { Observable } from 'rxjs';
import { LazyTableEvent } from '../Shared/models/data-model';

@Injectable({
  providedIn: 'root'
})
export class LazyTableService {

  constructor() { }
  
  getTenantsLazy(event: LazyTableEvent): Observable<any> {

    console.log("API PARAMS:", event);

    const totalRecords = 50000;
    const data: any[] = [];

    const start = event.first;
    const end = start + event.rows;

    for (let i = start; i < end; i++) {
      data.push({
        sno: i + 1,
        name: 'Tenant ' + i,
        phone: '99999' + i,
        room: 'Room ' + (i % 100),
        bed: 'B' + (i % 4),
        status: i % 2 ? 'Active' : 'Inactive'
      });
    }

    return of({ data, totalRecords });
  }
}
