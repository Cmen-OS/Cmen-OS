import { Component, OnInit } from '@angular/core';
import {FormControl, Validators, FormGroup, FormBuilder} from '@angular/forms';

@Component({
  selector: 'app-microchip',
  templateUrl: './microchip.component.html',
  styleUrls: ['./microchip.component.css']
})
export class MicrochipComponent implements OnInit {
  form!: FormGroup;

  constructor(    private formBuilder: FormBuilder,
  ) {
    this.buildForm();

  }

  ngOnInit(): void {
  }

  private buildForm() {
    this.form = this.formBuilder.group({
      numMicrochip: ['', Validators.required],
      tamanio: ['', Validators.required],
      peso: ['', Validators.required],
      caracteristicasFenotipicas: ['', Validators.required],

      rabia: ['', Validators.required],
      desparacitacion: [''],
      otros: ['', Validators.required],
      tiposDesparacitacion: ['', Validators.required],

      observaciones: ['', Validators.required],
      encargado: ['', Validators.required],

      nombre: ['', Validators.required],
      especie: ['', Validators.required],
      nombreCientifico: ['', Validators.required],
      edad: ['', Validators.required],
      sexo: ['', Validators.required],


    });
  }


  isBoxValid(box: String): Boolean {
    // @ts-ignore
    return this.form.get(box).touched && this.form.get(box).hasError('required');
  }

  isRabia: string[] = [
    'si',
    'no',
    'Otro'
  ]

  isDesparatizacion: string[] = [
    'si',
    'no',
    'Otro'
  ]

  desparazitaciones: string[] = [
    'Parasitos',
    'Gusanos',
    'Papagallos'
  ]

  sexos: string[] = [
    'Masculino',
    'Femenino',
    'otro'
  ]


  save(event: Event) {
    if (this.form.valid ) {
      console.log(this.form.value);




    } else {
      this.form.markAllAsTouched();
    }
  }
}
