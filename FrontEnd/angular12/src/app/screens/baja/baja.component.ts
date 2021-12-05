import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-baja',
  templateUrl: './baja.component.html',
  styleUrls: ['./baja.component.css']
})
export class BajaComponent implements OnInit {
  form!: FormGroup;

  constructor(
    private formBuilder: FormBuilder
  ) {
    this.buildForm();
  }
    ngOnInit(): void {
  }
  save(event: Event) {
    if (this.form.valid) {
      console.log(this.form.value);
    } else {
      this.form.markAllAsTouched();
    }
  }
  private buildForm() {
    this.form = this.formBuilder.group({
      ccfs: ['', Validators.required],
      numMMAA: ['', Validators.required],
      modalidadFun: ['', Validators.required],
      especie: ['', Validators.required],
      nombreComun: ['', Validators.required],
      codIdentificacion: ['', Validators.required],
      sexo: ['', Validators.required],
      edad: ['', Validators.required],
      fechaDeceso: ['', Validators.required],
      motivoSalida: ['', Validators.required],
      motivoSalidadesc: ['', Validators.required],
      nombre: ['', Validators.required],
      ci: ['', Validators.required],
      telf: ['', Validators.required],
      email: ['', Validators.required],
      causasDeceso: ['', Validators.required],
      lesionesEncontradas: ['', Validators.required],
      diagnosticoFinal: ['', Validators.required],
      documento: ['', Validators.required],
      nombreGuarda: ['', Validators.required],
      nombreVeterinario: ['', Validators.required],
      nombreDirector: ['', Validators.required],

      informeForense: ['', Validators.required],
      informeLab: ['', Validators.required],
      otro: ['', Validators.required],


    });
  }
  modalidades: string[] = [
    'CAD',
    'CR',
    'BIOP',
    'RT',
    'CI'
  ]

  motivosSalida: string[] = [
    'Entrega gobernacion',
    'Intercambio,',
    'Perdida'

  ]
  isBoxValid(box: String): Boolean {
    // @ts-ignore
    return this.form.get(box).touched && this.form.get(box).hasError('required');
  }
}
