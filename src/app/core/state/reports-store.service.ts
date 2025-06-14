import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Report } from '../models/report.model';

@Injectable({
  providedIn: 'root',
})
export class ReportsStoreService {
  private reportsSubject = new BehaviorSubject<Report[]>([]);
  private filteredReportsSubject = new BehaviorSubject<Report[]>([]);

  public readonly reports$: Observable<Report[]> = this.reportsSubject.asObservable();
  public readonly filteredReports$: Observable<Report[]> = this.filteredReportsSubject.asObservable();

  // Setters
  setReports(reports: Report[]) {
    this.reportsSubject.next(reports);
    // this.setFilteredReports(reports);
  }

  setFilteredReports(filtered: Report[]) {
    this.filteredReportsSubject.next(filtered);
  }

  // Getters
  getCurrentReports(): Report[] {
    return this.reportsSubject.getValue();
  }

  getCurrentFilteredReports(): Report[] {
    return this.filteredReportsSubject.getValue();
  }

  // Modificadores
  updateReport(updated: Report) {
    const current = this.getCurrentReports();
    const updatedList = current.map((r) => (r.id === updated.id ? updated : r));
    this.setReports(updatedList);
  }

  deleteReport(id: number) {
    const current = this.getCurrentReports();
    const updatedList = current.filter((r) => r.id !== id);
    this.setReports(updatedList);
  }
}
