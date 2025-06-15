import { Component, EventEmitter, Output, Input, OnChanges, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { ReportStatus } from '../../../../core/models/report.model';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-reports-filters',
  standalone: true,
  imports: [CommonModule, FormsModule, MatInputModule, MatSelectModule, MatButtonModule, MatIconModule],
  templateUrl: './reports-filters.component.html',
  styleUrls: ['./reports-filters.component.scss']
})
export class ReportsFiltersComponent {
  @Input() nameFilter: string = '';
  @Input() statusFilter: string = '';

  internalName: string = '';
  internalStatus: string = '';

  readonly ReportStatus = ReportStatus; 

  @Output() filterChange = new EventEmitter<{ name: string, status: string }>();

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['nameFilter']) {
      this.internalName = this.nameFilter;
    }
    if (changes['statusFilter']) {
      this.internalStatus = this.statusFilter;
    }
  }

  applyFilters() {
    this.filterChange.emit({
      name: this.internalName.trim().toLowerCase(),
      status: this.internalStatus
    });
  }

  clearFilters() {
    this.internalName = '';
    this.internalStatus = '';
    this.applyFilters();
  }
}
