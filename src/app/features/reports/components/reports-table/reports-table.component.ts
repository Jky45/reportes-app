import { Component, Input, Output, EventEmitter, OnChanges, AfterViewInit, ViewChild, SimpleChanges } from '@angular/core';
import { CommonModule, formatDate } from '@angular/common';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { Report, ReportStatus } from '../../../../core/models/report.model';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { After } from 'v8';

@Component({
  selector: 'app-reports-table',
  standalone: true,
  imports: [CommonModule, MatTableModule, MatButtonModule, MatIconModule, MatPaginatorModule],
  templateUrl: './reports-table.component.html',
  styleUrls: ['./reports-table.component.scss']
})
export class ReportsTableComponent implements OnChanges, AfterViewInit {
  @Input() reports: Report[] = [];
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  @Output() edit = new EventEmitter<Report>();
  @Output() delete = new EventEmitter<Report>();

  dataSource = new MatTableDataSource<Report>();
  displayedColumns: string[] = ['name', 'status', 'date', 'description', 'actions'];

  ngOnChanges(changes: SimpleChanges) {
    if (changes['reports']) {
      this.dataSource.data = this.reports;
    }
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  getFullName(report: Report): string {
    return `${report.name} ${report.surname}`;
  }

  getFormattedDate(date: string): string {
    return formatDate(date, 'dd/MM/yyyy', 'en-US');
  }

  canEdit(report: Report): boolean {
    return report.status === ReportStatus.Pendiente;
  }

  canDelete(report: Report): boolean {
    return report.status === ReportStatus.Pendiente || report.status === ReportStatus.Cancelada;
  }

  onEdit(report: Report): void {
    this.edit.emit(report); 
  }

  onDelete(report: Report): void {
    this.delete.emit(report); 
  }
}
