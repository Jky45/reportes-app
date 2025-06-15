import { Injectable, signal } from '@angular/core';
import { Report } from '../models/report.model';

@Injectable({
  providedIn: 'root',
})
export class ReportsStoreService {
  private readonly _reports = signal<ReadonlyArray<Report>>([]);
  private readonly _filteredReports = signal<ReadonlyArray<Report>>([]);

  readonly reports = this._reports.asReadonly();
  readonly filteredReports = this._filteredReports.asReadonly();

  setReports(reports: Report[]): void {
    this._reports.set(reports);
  }

  setFilteredReports(filtered: Report[]): void {
    this._filteredReports.set(filtered);
  }

  getCurrentReports(): Report[] {
    return this._reports() as Report[];
  }

  getCurrentFilteredReports(): Report[] {
    return this._filteredReports() as Report[];
  }

  updateReport(updated: Report): void {
    this._reports.update(reports =>
      reports.map(r => (r.id === updated.id ? updated : r))
    );
  }

  deleteReport(id: number): void {
    this._reports.update(reports =>
      reports.filter(r => r.id !== id)
    );
  }
}
