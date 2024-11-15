import { Component, OnInit, ViewChild } from '@angular/core';
import { Pcc } from '../pcc';
import { PccService } from '../pcc.service';
import { FormsModule } from '@angular/forms';
import { NgFor, NgIf } from '@angular/common';
import { Router } from '@angular/router';
import { ChartConfiguration, ChartData, ChartType } from 'chart.js';
import { BaseChartDirective, NgChartsModule } from 'ng2-charts';
import { TranslationService } from '../../commons/internationalization/translation.service';

@Component({
  selector: 'app-pcc-list',
  templateUrl: './pcc-list.component.html',
  styleUrl: './pcc-list.component.css',
  imports: [FormsModule, NgFor, NgIf, NgChartsModule],
  standalone: true,
})
export class PccListComponent implements OnInit {
  @ViewChild(BaseChartDirective) chart?: BaseChartDirective;

  pccList: Pcc[] = [];
  filteredPccs: Pcc[] = [];
  searchTerm: string = '';
  fromDate: string | null = null;
  toDate: string | null = null;
  role: string = localStorage.getItem('role') ?? 'AGENT';

  monthsEs = [
    'Ene',
    'Feb',
    'Mar',
    'Abr',
    'May',
    'Jun',
    'Jul',
    'Ago',
    'Sep',
    'Oct',
    'Nov',
    'Dic',
  ];
  monthsEn = [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'Jun',
    'Jul',
    'Aug',
    'Sep',
    'Oct',
    'Nov',
    'Dec',
  ];
  // Chart configuration
  barChartData: ChartData<'bar'> = { labels: [], datasets: [] };
  barChartOptions: ChartConfiguration['options'] = {
    responsive: true,
    scales: { y: { beginAtZero: true, ticks: { stepSize: 1 } } },
  };
  barChartType: ChartType = 'bar';

  constructor(
    private readonly ppcService: PccService,
    private readonly translationService: TranslationService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.fetchPQRs();
  }

  fetchPQRs(): void {
    this.ppcService.getPccList(this.role).subscribe(
      (data: Pcc[]) => {
        this.pccList = data;
        this.filteredPccs = data;
        if (this.role === 'CLIENT') {
          this.updateChart();
        }
      },
      (error) => {
        console.error('Error fetching PQR list:', error);
        this.pccList = []; // Clear list on error
        this.filteredPccs = []; // Clear filtered list on error
      }
    );
  }

  applyFilter(): void {
    this.filteredPccs = this.pccList.filter((pcc) => {
      const matchesSearchTerm = pcc.id
        .toLowerCase()
        .includes(this.searchTerm.toLowerCase());

      const createDate = new Date(pcc.create_at);
      const matchesFromDate =
        !this.fromDate || createDate >= new Date(this.fromDate);
      const matchesToDate = !this.toDate || createDate <= new Date(this.toDate);

      return matchesSearchTerm && matchesFromDate && matchesToDate;
    });

    if (this.role === 'CLIENT') {
      this.updateChart();
    }
  }

  updateChart(): void {
    const monthlyStatusCounts: {
      [month: string]: { [status: string]: number };
    } = {};

    const colorPalette = [
      '#FF6384',
      '#36A2EB',
      '#FFCE56',
      '#4BC0C0',
      '#9966FF',
      '#FF9F40',
    ];

    this.filteredPccs.forEach((pcc) => {
      const date = new Date(pcc.create_at);

      // Ensure consistent month extraction
      const month = date.getUTCMonth(); // Use getUTCMonth for timezone-independent results
      const year = date.getUTCFullYear();

      const monthKey = `${
        this.translationService.getCurrentLanguage() === 'es-CO'
          ? this.monthsEs[month]
          : this.monthsEn[month]
      }-${year}`;

      if (!monthlyStatusCounts[monthKey]) {
        monthlyStatusCounts[monthKey] = {};
      }
      if (!monthlyStatusCounts[monthKey][pcc.status]) {
        monthlyStatusCounts[monthKey][pcc.status] = 0;
      }
      monthlyStatusCounts[monthKey][pcc.status]++;
    });

    const sortedMonths = Object.keys(monthlyStatusCounts).sort((a, b) => {
      const [monthA, yearA] = a
        .split('-')
        .map((val, idx) => (idx === 0 ? this.monthsEn.indexOf(val) : +val));
      const [monthB, yearB] = b
        .split('-')
        .map((val, idx) => (idx === 0 ? this.monthsEn.indexOf(val) : +val));
      return yearA !== yearB ? yearA - yearB : monthA - monthB;
    });

    const datasets = Object.keys(
      this.filteredPccs.reduce(
        (acc, pcc) => ({ ...acc, [pcc.status]: true }),
        {}
      )
    ).map((status, index) => ({
      label: status,
      data: sortedMonths.map(
        (month) => monthlyStatusCounts[month][status] || 0
      ),
      backgroundColor: colorPalette[index % colorPalette.length],
      borderColor: colorPalette[index % colorPalette.length],
      borderWidth: 1,
    }));

    this.barChartData = {
      labels: sortedMonths,
      datasets: datasets,
    };

    this.chart?.update();
  }

  viewPccDetail(id: string): void {
    this.router.navigate(['/pcc-detail', id]);
  }
}
