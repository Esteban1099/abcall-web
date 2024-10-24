import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute, Router } from '@angular/router';
import { Input } from '@angular/core';
import { Consumer } from '../../consumer/consumer';

@Component({
  selector: 'app-create-pqr',
  templateUrl: './create-pqr.component.html',
  styleUrl: './create-pqr.component.css',
  standalone: true
})
export class CreatePqrComponent {
  @Input() consumer!: Consumer;
}
