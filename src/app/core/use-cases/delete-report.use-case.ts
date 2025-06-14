import { Injectable } from '@angular/core';
import { ReportsService } from '../services/reports.service';
import { ReportsStoreService } from '../state/reports-store.service';
import { tap } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class DeleteReportUseCase {
  constructor(
    private store: ReportsStoreService,
    private reportsService: ReportsService
  ) {}

  execute(id: number): Observable<void> {
    return this.reportsService.deleteReport(id).pipe(
      tap(() => {
        this.store.deleteReport(id);
      })
    );
  }
}
