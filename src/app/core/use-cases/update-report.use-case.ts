import { Injectable } from '@angular/core';
import { ReportsStoreService } from '../state/reports-store.service';
import { ReportsService } from '../services/reports.service';
import { Report } from '../models/report.model';
import { tap } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class UpdateReportUseCase {
  constructor(
    private store: ReportsStoreService,
    private reportsService: ReportsService
  ) {}

  execute(report: Report): Observable<Report> {
    return this.reportsService.updateReport(report).pipe(
      tap((updatedReport) => {
        this.store.updateReport(updatedReport);
      })
    );
  }
}
