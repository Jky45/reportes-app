import { Injectable } from '@angular/core';
import { ReportsService } from '../services/reports.service';
import { ReportsStoreService } from '../state/reports-store.service';
import { Observable, tap } from 'rxjs';
import { Report } from '../models/report.model';

@Injectable({
  providedIn: 'root',
})
export class LoadReportsUseCase {
  constructor(
    private reportsService: ReportsService,
    private reportsStore: ReportsStoreService
  ) {}

  execute(): Observable<Report[]> {
    return this.reportsService.getReports().pipe(
      tap(reports => this.reportsStore.setReports(reports))
    );
  }
  
}
