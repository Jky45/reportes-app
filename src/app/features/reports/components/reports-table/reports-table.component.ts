import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { Report } from '../../../../core/models/report.model';
import { formatDate } from '@angular/common';

@Component({
  selector: 'app-reports-table',
  standalone: true,
  imports: [CommonModule, MatTableModule, MatButtonModule, MatIconModule],
  templateUrl: './reports-table.component.html',
  styleUrls: ['./reports-table.component.scss']
})
export class ReportsTableComponent {
  @Input() reports: Report[] = [];

  displayedColumns: string[] = ['name', 'status', 'date', 'description', 'actions'];

  getFullName(report: Report): string {
    return `${report.name} ${report.surname}`;
  }

  getFormattedDate(date: string): string {
    return formatDate(date, 'dd/MM/yyyy', 'en-US');
  }

  canEdit(report: Report): boolean {
    return report.status === 'Pendiente';
  }

  canDelete(report: Report): boolean {
    return report.status === 'Pendiente' || report.status === 'Cancelada';
  }

  onEdit(report: Report): void {
    console.log('Editar:', report);
  }

  onDelete(report: Report): void {
    console.log('Eliminar:', report);
  }
}
