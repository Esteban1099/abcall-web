import { Component, OnInit } from '@angular/core';
import { Pcc } from '../pcc';
import { PccService } from '../pcc.service';
import { ActivatedRoute, RouterLink } from '@angular/router';
import {NgForOf, NgIf} from '@angular/common';



@Component({
  selector: 'app-pcc-detail',
  templateUrl: './pcc-detail.component.html',
  styleUrls: ['./pcc-detail.component.css'],
  imports: [
    NgIf,
    NgForOf,
    RouterLink,
  ],
  standalone: true,
})
export class PccDetailComponent implements OnInit {
  pcc!: Pcc;

  constructor(
    private readonly ppcService: PccService,
    private readonly route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      const id = params.get('id');
      if (id) {
        this.fetchPQR(id);
        console.log('It got some id');
      } else {
        console.error('No id found in route');
      }
    });
  }

  fetchPQR(id: string): void {
    this.ppcService.getPccDetail(id).subscribe(
      (data: Pcc) => {
        this.pcc = data;  // Ensure the data is assigned here
        console.log('Fetched Pcc:', this.pcc);  // Log the result to confirm
      },
      (error: any) => {
        console.error('Error fetching PQR:', error);
      }
    );
  }

}
