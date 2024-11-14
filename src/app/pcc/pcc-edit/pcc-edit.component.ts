import { NgForOf, NgIf } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { PccService } from '../pcc.service';
import { Pcc } from '../pcc';
import {ToastService} from '../../commons/toast.service';
import {EventService} from '../../commons/event.service';
import {FormBuilder, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';


@Component({
  selector: 'app-pcc-edit',
  templateUrl: './pcc-edit.component.html',
  styleUrls: ['./pcc-edit.component.css'],
  imports: [
    ReactiveFormsModule,
    NgIf,
    NgForOf,
    RouterLink,
  ],
  standalone: true,
})
export class PccEditComponent implements OnInit {
  pcc!: Pcc;
  pccEditForm!: FormGroup;

  constructor(
    private readonly formBuilder: FormBuilder,
    private readonly ppcService: PccService,
    private readonly route: ActivatedRoute,
    private readonly router: Router
  ) { }

  ngOnInit(): void {
    const pccId = this.route.snapshot.paramMap.get('id')!;
    console.log('PQR recibida en pcc-edit:', this.pcc);
    if (pccId) {
      // Usa el ID para obtener el Pcc desde el servicio
      this.ppcService.getPccDetail(pccId).subscribe((pcc) => {
        this.pcc = pcc;
      });
    }
    this.pccEditForm = this.formBuilder.group({
      status: ['', Validators.required],
      reason: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(1000)]],
    });


  }

  onSubmit(): void {
    if (this.pccEditForm.valid && this.pcc) {
      const { status, reason } = this.pccEditForm.value;
      const payload = { status, reason };

      this.ppcService.updatePcc(this.pcc.id, payload).subscribe(
        (updatedPcc) => {
          this.router.navigate(['/pcc-detail', this.pcc.id]);
        },
        (error) => {
          console.error('Error al actualizar la PQR:', error);
        }
      );
    }
  }
}
