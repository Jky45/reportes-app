import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Report } from '../../core/models/report.model';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class ReportsService {
  private readonly BASE_URL = 'assets/data/reports.json';

  constructor(private http: HttpClient) {}

  getReports(): Observable<Report[]> {
    return this.http.get<Report[]>(this.BASE_URL);
  }

  updateReport(report: Report): Observable<Report> {
    return of(report); // Simula éxito
  }

  deleteReport(id: number): Observable<void> {
    return of(void 0); // Simula éxito
  }
}

