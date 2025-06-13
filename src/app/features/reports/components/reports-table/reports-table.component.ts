import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule, formatDate } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { Report, ReportStatus } from '../../../../core/models/report.model';

@Component({
  selector: 'app-reports-table',
  standalone: true,
  imports: [CommonModule, MatTableModule, MatButtonModule, MatIconModule],
  templateUrl: './reports-table.component.html',
  styleUrls: ['./reports-table.component.scss']
})
export class ReportsTableComponent {
  @Input() reports: Report[] = [];

  @Output() edit = new EventEmitter<Report>();
  @Output() delete = new EventEmitter<Report>();

  displayedColumns: string[] = ['name', 'status', 'date', 'description', 'actions'];

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
