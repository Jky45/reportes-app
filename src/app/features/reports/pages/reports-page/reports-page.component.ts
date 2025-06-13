import { Component, OnInit } from '@angular/core';
import { ReportsService } from '../../../../core/services/reports.service';
import { Report } from '../../../../core/models/report.model';
import { CommonModule } from '@angular/common';
import { ReportsTableComponent } from '../../components/reports-table/reports-table.component';
import { ReportsFiltersComponent } from '../../components/reports-filters/reports-filters.component';
import { MatDialog } from '@angular/material/dialog';
import { ReportsDialogComponent } from '../../components/reports-dialog/reports-dialog.component';


@Component({
  selector: 'app-reports-page',
  standalone: true,
  templateUrl: './reports-page.component.html',
  styleUrls: ['./reports-page.component.scss'],
  imports: [
    CommonModule,
    ReportsTableComponent,
    ReportsFiltersComponent // 👈 agregamos los filtros
  ]
})
export class ReportsPageComponent implements OnInit {
  reports: Report[] = [];
  filteredReports: Report[] = [];

  constructor(private reportsService: ReportsService, private dialog: MatDialog) {}

  ngOnInit(): void {
    this.reportsService.getReports().subscribe((data) => {
      console.log('📄 Datos de reportes:', data);
      this.reports = data;
      this.filteredReports = data; // inicialmente sin filtros
    });
  }

  onFilterChange(filter: { name: string, status: string }) {
    this.filteredReports = this.reports.filter((report) => {
      const fullName = `${report.name} ${report.surname}`.toLowerCase();
      const matchesName = fullName.includes(filter.name);
      const matchesStatus = filter.status ? report.status === filter.status : true;
      return matchesName && matchesStatus;
    });
  }

  onEdit(report: Report): void {
    const dialogRef = this.dialog.open(ReportsDialogComponent, {
      data: report
    });
  
    dialogRef.afterClosed().subscribe((result: Report | undefined) => {
      if (result) {
        // Aquí harías un PUT al servidor y actualizarías la lista
        console.log('✅ Reporte editado:', result);
      }
    });
  }
  
  onDelete(report: Report): void {
    console.log('🗑️ Eliminar reporte:', report);
  }
  
}
