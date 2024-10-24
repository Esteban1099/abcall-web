import { Component, OnInit,Input, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute, Router } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { Cons } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Consumer } from '../consumer';
import { ConsumerService } from '../consumer.service';

@Component({
  selector: 'app-search-consumer',
  templateUrl: './search-consumer.component.html',
  styleUrl: './search-consumer.component.css'
})
export class SearchConsumerComponent implements OnInit {
  @Input() numeroIdentificacion!: string;
  @Input() tipoIdentificacion!: string;
  @Output() userFound = new EventEmitter<Consumer>();
  consumerFound!: Consumer; // Propiedad para almacenar el objeto Consumer

  menuOpen = false;
  authForm!: FormGroup;



  constructor(
    private formBuilder: FormBuilder,
    private toastr: ToastrService,
    private route: ActivatedRoute,
    private router: Router,
    private http: HttpClient,
    private  consumerService: ConsumerService // Inyectar el servicio HttpClient
  ) {}

  toggleMenu() {
    this.menuOpen = !this.menuOpen;
  }

  navigateTo(path: string) {
    this.menuOpen = false; // Cierra el menú después de la navegación
    this.router.navigate([`/${path}`]);
  }

  ngOnInit() {
    this.authForm = this.formBuilder.group({
      tipoId: ['', [Validators.required]],
      numeroId: ['', Validators.required],
    });
  }

  searchConsumer() {
    this.consumerService.getConsumer(this.tipoIdentificacion, this.numeroIdentificacion).subscribe(
      (consumer: Consumer) => {
        this.consumerFound = consumer;
        this.userFound.emit(consumer);
      },
      (error) => {
        console.error('Error al obtener el consumidor', error);
      }
    );
  }

}
