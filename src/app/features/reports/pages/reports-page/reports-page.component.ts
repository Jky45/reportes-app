import { Component, OnInit } from '@angular/core';
import { ReportsService } from '../../../../core/services/reports.service';
import { Report } from '../../../../core/models/report.model';
import { CommonModule } from '@angular/common';
import { ReportsTableComponent } from '../../components/reports-table/reports-table.component';
import { ReportsFiltersComponent } from '../../components/reports-filters/reports-filters.component';
import { MatDialog } from '@angular/material/dialog';
import { ReportsDialogComponent } from '../../components/reports-dialog/reports-dialog.component';
import { ActivatedRoute, Router } from '@angular/router';


@Component({
  selector: 'app-reports-page',
  standalone: true,
  templateUrl: './reports-page.component.html',
  styleUrls: ['./reports-page.component.scss'],
  imports: [
    CommonModule,
    ReportsTableComponent,
    ReportsFiltersComponent
  ]
})
export class ReportsPageComponent implements OnInit {
  reports: Report[] = [];
  filteredReports: Report[] = [];

  currentNameFilter = '';
  currentStatusFilter = '';

  constructor(
    private reportsService: ReportsService,
    private dialog: MatDialog,
    private route: ActivatedRoute,
    private router: Router
  ) {}
  

  ngOnInit(): void {
    this.reportsService.getReports().subscribe((data) => {
      this.reports = data;
  
      const name = this.route.snapshot.queryParamMap.get('name') || '';
      const status = this.route.snapshot.queryParamMap.get('status') || '';
  
      this.applyFilters({ name, status });
    });
  }
  

  applyFilters(filter: { name: string; status: string }) {
    this.filteredReports = this.reports.filter((report) => {
      const fullName = `${report.name} ${report.surname}`.toLowerCase();
      const matchesName = fullName.includes(filter.name.toLowerCase());
      const matchesStatus = filter.status ? report.status === filter.status : true;
      return matchesName && matchesStatus;
    });
  
    this.currentNameFilter = filter.name;
    this.currentStatusFilter = filter.status;
  
    this.router.navigate([], {
      queryParams: {
        name: filter.name || null,
        status: filter.status || null
      },
      queryParamsHandling: 'merge'
    });
  }

  onEdit(report: Report): void {
    const dialogRef = this.dialog.open(ReportsDialogComponent, {
      data: report
    });
  
    dialogRef.afterClosed().subscribe((result: Report | undefined) => {
      if (result) {
        console.log('✅ Reporte editado:', result);
      }
    });
  }
  
  onDelete(report: Report): void {
    console.log('🗑️ Eliminar reporte:', report);
  }
  
}
