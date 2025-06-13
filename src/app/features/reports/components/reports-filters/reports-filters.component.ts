import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { ReportStatus } from '../../../../core/models/report.model';

@Component({
  selector: 'app-reports-filters',
  standalone: true,
  imports: [CommonModule, FormsModule, MatInputModule, MatSelectModule, MatButtonModule],
  templateUrl: './reports-filters.component.html',
  styleUrls: ['./reports-filters.component.scss']
})
export class ReportsFiltersComponent {
  nameFilter: string = '';
  statusFilter: string = '';

  readonly ReportStatus = ReportStatus; 

  @Output() filterChange = new EventEmitter<{ name: string, status: string }>();

  applyFilters() {
    this.filterChange.emit({
      name: this.nameFilter.trim().toLowerCase(),
      status: this.statusFilter
    });
  }

  clearFilters() {
    this.nameFilter = '';
    this.statusFilter = '';
    this.applyFilters(); // Emite filtros vacíos
  }
}
