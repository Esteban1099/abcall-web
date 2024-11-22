import { NgForOf, NgIf } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { PccService } from '../pcc.service';
import { Pcc } from '../pcc';
import { ToastService } from '../../commons/toast.service';
import { EventService } from '../../commons/event.service';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-pcc-edit',
  templateUrl: './pcc-edit.component.html',
  styleUrls: ['./pcc-edit.component.css'],
  imports: [ReactiveFormsModule, NgIf, NgForOf, RouterLink, TranslateModule],
  standalone: true,
})
export class PccEditComponent implements OnInit {
  pcc!: Pcc;
  pccEditForm!: FormGroup;

  constructor(
    private readonly formBuilder: FormBuilder,
    private readonly ppcService: PccService,
    private readonly route: ActivatedRoute,
    private readonly router: Router,
    private toastService: ToastService,
    private eventService: EventService
  ) {}

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
      reason: [
        '',
        [
          Validators.required,
          Validators.minLength(8),
          Validators.maxLength(1000),
        ],
      ],
    });
  }

  onSubmit(): void {
    if (this.pccEditForm.valid && this.pcc) {
      const { status, reason } = this.pccEditForm.value;
      const payload = { status, reason };

      this.ppcService.updatePcc(this.pcc.id, payload).subscribe(
        (updatedPcc) => {
          this.router.navigate(['/pcc-edit', this.pcc.id]);
          this.pccEditForm.reset();
          this.pccEditForm.markAsPristine();
          this.pccEditForm.markAsUntouched();
          if ((localStorage.getItem('lang') || 'es-CO') === 'es-CO') {
            this.toastService.showSuccess(
              'La PQR ha sido Editada exitosamente'
            );
          } else {
            this.toastService.showSuccess('PCC has been edited successfully');
          }
        },
        (error) => {
          if ((localStorage.getItem('lang') || 'es-CO') === 'es-CO') {
            this.toastService.showError('Error al actualizar la PQR');
          } else {
            this.toastService.showError('Error updating the PCC');
          }
          console.error('Error al actualizar la PQR:', error);
        }
      );
    }
  }
}
