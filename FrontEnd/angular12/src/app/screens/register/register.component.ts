import {Component, OnInit} from '@angular/core';
import {FormControl, Validators, FormGroup, FormBuilder} from '@angular/forms';

import {Box} from 'src/app/models/box.model';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  form!: FormGroup;
  imagen:any

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
      especie: ['', Validators.required],
      lugarExp: ['', Validators.required],
      precedencia: ['', Validators.required],
      numActa: ['', Validators.required],
      modFuncionamiento: [''],
      codIdentificacion: ['', Validators.required],
      areaIngreso: ['', Validators.required],
      motivoIngreso: ['', Validators.required],
      numAutorizacion: ['', Validators.required],

      nombre: ['', Validators.required],
      telefono: ['', Validators.required],
      numFormMMAA: ['', Validators.required],
      domicilio: ['', Validators.required],
      correo: ['', Validators.required],
      recibidoPor: ['', Validators.required],
      ci: ['', Validators.required],


      image: ['', Validators.required],
      nombrePropio: ['', Validators.required],
      fechaRecepcion: ['', Validators.required],
      sexo: ['', Validators.required],
      edad: ['', Validators.required],
      nombreCriollo: ['', Validators.required],
      nombreComun: ['', Validators.required],


    });



  }

  places: string[] = [
    'La Paz',
    'Cochabamba',
    'Santa Cruz',
    'Tangamandapio'
  ]
  modFuncs: string[] = [
    'CR',
    'CF',
    'CD'
  ]

  areas: string[] = [
    'Exposicion',
    'Guardado',
    'Otro'
  ]

  motivos: string[] = [
    'Rescate',
    'Botado',
    'Otro'
  ]

  sexos: string[] = [
    'M',
    'F',
    'Otro'
  ]

  edades: string[] = [
    'Joven',
    'sXD',
    'Otro'
  ]

  uploadFile(event:any){
    //todo subir a la base de datos
    const file = event.target.file.path
    this.imagen = file
  }
  isBoxValid(box: String): Boolean {
    // @ts-ignore
    return this.form.get(box).touched && this.form.get(box).hasError('required');
  }

  isBoxInvalid(box: String): Boolean {
    // @ts-ignore
    return this.form.get(box).touched && !this.form.get(box).hasError('required');
  }
}
