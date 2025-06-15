import { Injectable, signal } from '@angular/core';
import { Report } from '../models/report.model';

@Injectable({
  providedIn: 'root',
})
export class ReportsStoreService {
  reports = signal<Report[]>([]);
  filteredReports = signal<Report[]>([]);

  setReports(reports: Report[]) {
    this.reports.set(reports);
  }

  setFilteredReports(filtered: Report[]) {
    this.filteredReports.set(filtered);
  }

  getCurrentReports(): Report[] {
    return this.reports();
  }

  getCurrentFilteredReports(): Report[] {
    return this.filteredReports();
  }

  updateReport(updated: Report) {
    const updatedList = this.reports().map(r =>
      r.id === updated.id ? updated : r
    );
    this.reports.set(updatedList);
  }

  deleteReport(id: number) {
    const updatedList = this.reports().filter(r => r.id !== id);
    this.reports.set(updatedList);
  }
}
