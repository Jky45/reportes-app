import { Injectable } from '@angular/core';
import { ReportsStoreService } from '../state/reports-store.service';
import { ReportsFilterService } from '../services/reports-filter.service';

export interface FilterCriteria {
  name: string;
  status: string;
}

@Injectable({ providedIn: 'root' })
export class FilterReportsUseCase {
  constructor(
    private store: ReportsStoreService,
    private filterService: ReportsFilterService
  ) {}

  execute(criteria: FilterCriteria): void {
    const all = this.store.getCurrentReports();
    const filtered = this.filterService.filter(all, criteria);
    this.store.setFilteredReports(filtered);
  }
}
