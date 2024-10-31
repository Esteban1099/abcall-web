import { Component, OnInit } from '@angular/core';
import { Pcc } from '../pcc';
import { PccService } from '../pcc.service';
import { FormsModule } from '@angular/forms';
import { NgFor } from '@angular/common';

@Component({
  selector: 'app-pcc-list',
  templateUrl: './pcc-list.component.html',
  styleUrl: './pcc-list.component.css',
  imports: [FormsModule, NgFor],
  standalone: true,
})
export class PccListComponent implements OnInit {
  pccList: Pcc[] = [];
  filteredPccs: Pcc[] = [];
  searchTerm: string = '';

  constructor(private ppcService: PccService) {}

  ngOnInit(): void {
    this.fetchPQRs();
  }

  fetchPQRs(): void {
    this.ppcService.getPccList().subscribe(
      (data: Pcc[]) => {
        this.pccList = data;
        this.filteredPccs = data;
      },
      (error) => {
        console.error('Error fetching PQR list:', error);
      }
    );
  }

  applyFilter(): void {
    if (this.searchTerm.trim() === '') {
      this.filteredPccs = this.pccList;
    } else {
      this.filteredPccs = this.pccList.filter((pcc) =>
        pcc.id.toLowerCase().includes(this.searchTerm.toLowerCase())
      );
    }
  }
}
