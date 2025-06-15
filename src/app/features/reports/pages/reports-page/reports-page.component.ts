import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';

import { ReportsTableComponent } from '../../components/reports-table/reports-table.component';
import { ReportsFiltersComponent } from '../../components/reports-filters/reports-filters.component';
import { ReportsDialogComponent } from '../../components/reports-dialog/reports-dialog.component';

import { ReportsStoreService } from '../../../../core/state/reports-store.service';
import { FilterReportsUseCase } from '../../../../core/use-cases/filter-reports.use-case';
import { LoadReportsUseCase } from '../../../../core/use-cases/load-reports.use-case';
import { UpdateReportUseCase } from '../../../../core/use-cases/update-report.use-case';
import { DeleteReportUseCase } from '../../../../core/use-cases/delete-report.use-case';
import { Report } from '../../../../core/models/report.model';

@Component({
  selector: 'app-reports-page',
  standalone: true,
  imports: [CommonModule, ReportsTableComponent, ReportsFiltersComponent],
  templateUrl: './reports-page.component.html',
  styleUrls: ['./reports-page.component.scss'],
})
export class ReportsPageComponent implements OnInit {

  private store = inject(ReportsStoreService);
  private filterReports = inject(FilterReportsUseCase);
  private loadReports = inject(LoadReportsUseCase);
  private updateReport = inject(UpdateReportUseCase);
  private deleteReport = inject(DeleteReportUseCase);

  private dialog = inject(MatDialog);
  private route = inject(ActivatedRoute);
  private router = inject(Router);

  readonly filteredReports = this.store.filteredReports;

  currentNameFilter = '';
  currentStatusFilter = '';

  ngOnInit(): void {
    const name = this.route.snapshot.queryParamMap.get('name') || '';
    const status = this.route.snapshot.queryParamMap.get('status') || '';

    this.currentNameFilter = name;
    this.currentStatusFilter = status;

    this.loadReports.execute().subscribe(() => {
      this.applyFilters({ name, status });
    });
  }

  applyFilters(filter: { name: string; status: string }) {
    this.currentNameFilter = filter.name;
    this.currentStatusFilter = filter.status;

    this.filterReports.execute(filter);

    this.router.navigate([], {
      queryParams: {
        name: filter.name || null,
        status: filter.status || null,
      },
      queryParamsHandling: 'merge',
    });
  }

  onEdit(report: Report): void {
    const dialogRef = this.dialog.open(ReportsDialogComponent, { data: report });

    dialogRef.afterClosed().subscribe((result: Report | undefined) => {
      if (result) {
        this.updateReport.execute(result).subscribe(() => {
          this.filterReports.execute({
            name: this.currentNameFilter,
            status: this.currentStatusFilter,
          });
        });
      }
    });
  }

  onDelete(report: Report): void {
    this.deleteReport.execute(report.id).subscribe(() => {
      this.filterReports.execute({
        name: this.currentNameFilter,
        status: this.currentStatusFilter,
      });
    });
  }
}
