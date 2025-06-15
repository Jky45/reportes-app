import { Component, OnDestroy, OnInit, inject } from '@angular/core';
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

import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-reports-page',
  standalone: true,
  imports: [CommonModule, ReportsTableComponent, ReportsFiltersComponent],
  templateUrl: './reports-page.component.html',
  styleUrls: ['./reports-page.component.scss'],
})
export class ReportsPageComponent implements OnInit, OnDestroy {
  private destroy$ = new Subject<void>();
  private readonly store = inject(ReportsStoreService);
  private readonly reportsFilterer = inject(FilterReportsUseCase);
  private readonly reportsLoader = inject(LoadReportsUseCase);
  private readonly reportsUpdater = inject(UpdateReportUseCase);
  private readonly reportsDeleter = inject(DeleteReportUseCase);
  private readonly dialog = inject(MatDialog);
  private readonly route = inject(ActivatedRoute);
  private readonly router = inject(Router);

  readonly filteredReports = this.store.filteredReports;

  currentNameFilter = '';
  currentStatusFilter = '';

  ngOnInit(): void {
    this.reportsLoader.execute()
      .pipe(takeUntil(this.destroy$))
      .subscribe(() => {
        this.route.queryParamMap
          .pipe(takeUntil(this.destroy$))
          .subscribe((params) => {
            const name = params.get('name') || '';
            const status = params.get('status') || '';

            this.currentNameFilter = name;
            this.currentStatusFilter = status;

            this.applyFilters({ name, status });
          });
      });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  applyFilters(filter: { name: string; status: string }) {
    this.currentNameFilter = filter.name;
    this.currentStatusFilter = filter.status;

    this.reportsFilterer.execute(filter);

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

    dialogRef.afterClosed()
      .pipe(takeUntil(this.destroy$))
      .subscribe((result: Report | undefined) => {
        if (result) {
          this.reportsUpdater.execute(result)
            .pipe(takeUntil(this.destroy$))
            .subscribe(() => {
              this.reportsFilterer.execute({
                name: this.currentNameFilter,
                status: this.currentStatusFilter,
              });
            });
        }
      });
  }

  onDelete(report: Report): void {
    this.reportsDeleter.execute(report.id)
      .pipe(takeUntil(this.destroy$))
      .subscribe(() => {
        this.reportsFilterer.execute({
          name: this.currentNameFilter,
          status: this.currentStatusFilter,
        });
      });
  }
}
