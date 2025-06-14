import { Injectable } from '@angular/core';
import { Report } from '../models/report.model';
import { FilterCriteria } from '../use-cases/filter-reports.use-case';


@Injectable({ providedIn: 'root' })
export class ReportsFilterService {
  filter(reports: Report[], criteria: FilterCriteria): Report[] {
    const nameFilter = criteria.name.toLowerCase().trim();
    const statusFilter = criteria.status;

    return reports.filter(report => {
      const fullName = `${report.name} ${report.surname}`.toLowerCase();
      const matchesName = fullName.includes(nameFilter);
      const matchesStatus = statusFilter ? report.status === statusFilter : true;
      return matchesName && matchesStatus;
    });
  }
}
