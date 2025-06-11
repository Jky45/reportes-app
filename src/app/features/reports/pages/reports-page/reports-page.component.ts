import { Component, OnInit } from '@angular/core';
import { ReportsService } from '../../../../core/services/reports.service';
import { Report } from '../../../../core/models/report.model';
import { CommonModule } from '@angular/common';
import { ReportsTableComponent } from '../../components/reports-table/reports-table.component';

@Component({
  selector: 'app-reports-page',
  standalone: true,
  templateUrl: './reports-page.component.html',
  styleUrls: ['./reports-page.component.scss'],
  imports: [CommonModule, ReportsTableComponent], 
})
export class ReportsPageComponent implements OnInit {
  reports: Report[] = [];

  constructor(private reportsService: ReportsService) {}

  ngOnInit(): void {
    this.reportsService.getReports().subscribe((data) => {
      console.log('📄 Datos de reportes:', data);
      this.reports = data;
    });
  }
}
