import {Component, OnInit} from '@angular/core';
import {FormControl, Validators, FormGroup, FormBuilder} from '@angular/forms';

import { RegistroService } from "../../services/registro/registro.service";
import { AnimalService } from "../../services/animal/animal.service";
import { OperadorService } from "../../services/operador/operador.service";
import {ArchivoService} from "../../services/archivo/archivo.service";
import { Operador} from "../../models/operador/operador.model";
import { Registro } from "../../models/registro/registro.model";
import { Animal } from "../../models/animal/animal.model";
import {Microchip} from "../../models/microchip/microchip.model";
import {Taxonomia} from "../../models/taxonomia/taxonomia.model";
import {Archivo} from "../../models/archivo/archivo.model";
import {DataService} from "../../data.service";



import {Box} from 'src/app/models/box.model';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  form!: FormGroup;
  imagen: any;
  count = 0;
/*
  date: Date = new Date();

  operadores: Operador[] = [];

  archivo: Archivo = {};

  microchip: Microchip = {} as Microchip;

  taxonomia: Taxonomia = {};

  operador: Operador = {};

  animal: Animal = {};

*/

  constructor(
    private operadorService: OperadorService,
    private archivoService: ArchivoService,
    private animalService: AnimalService,
    private registroService: RegistroService,
    private formBuilder: FormBuilder,
    private data:DataService,

  ) {
    this.buildForm();
  }

  ngOnInit(): void {
    this.data.count.subscribe(c => {
      this.count = c;
    });

  }

  save(event: Event) {
    if (this.form.valid) {
      console.log(this.form.value);
/*
      const archivo ={
        ruta: "/prueba/prueba",
        peso: this.imagen.weight,
        nombre: this.imagen.name,
        creado: this.date.getFullYear().toString()+'-'+this.date.getMonth().toString()+'-'+this.date.getDate().toString(),
        tipo: this.imagen.name[-4],
        file: this.imagen
      };

      this.archivoService.create(archivo).subscribe(data => console.log(data), error => console.log(error));

      this.archivo = archivo;

      this.operadorService.findByEmail(this.form.value.correo)
        .subscribe(
          data => {
            this.operadores = data;
            console.log(data);},
          error => {
            console.log(error)
          })
      // @ts-ignore
      this.operador = this.operadores[0];

      const animal = {
        nombre_criollo: this.form.value.nombreCriollo,
        nombre_comun: this.form.value.nombreComun,
        nombre_propio: this.form.value.nombrePropio,
        edad: this.form.value.edad,
        procedencia: this.form.value.precedencia,
        fecha_recepcion: this.form.value.fechaRecepcion,
        sexo: this.form.value.sexo,
        estado_salud: this.form.value.estadoSaludes,
        detalles_salud: this.form.value.detalleSaludes,
        cod_int_id: this.microchip,
        especie_id: this.taxonomia,
        ruta_archivo_id: this.archivo
      };

      this.animal = animal;

      this.animalService.create(animal).subscribe(data => console.log(data), error => console.log(error));

      const data = {
        nro_acta_decomiso: this.form.value.numActa,
        fecha_registro: this.date.getFullYear().toString()+'-'+this.date.getMonth().toString()+'-'+this.date.getDate().toString(),
        CCFS: this.form.value.ccfs,
        modalidad_funcionamiento: this.form.value.modFuncionamiento,
        area: this.form.value.areaIngreso,
        lugar_exposicion: this.form.value.lugarExp,
        motivo_recepcion: this.form.value.motivoIngreso,
        nro_acta_traslado: this.form.value.numAutorizacion,
        nro_MMAA: this.form.value.numFormMMAA,
        id_animal_id: this.animal,
        ci_autorizado_por_id: this.operador,
        ci_recibido_por_id: this.operador,
      }

      this.registroService.create(data).subscribe(data => console.log(data), error => console.log(error))
*/
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
      estadoSaludes: ['', Validators.required],
      detalleSaludes: ['', Validators.required],




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

  saludes: string[] = [
    'Mal',
    'Bien',
    'Otro'
  ]


  uploadFile(event:any){
    //todo subir a la base de datos
    this.imagen = event.target.files[0]
  }
  isBoxValid(box: String): Boolean {
    // @ts-ignore
    return this.form.get(box).touched && this.form.get(box).hasError('required');
  }

  isBoxInvalid(box: String): Boolean {
    // @ts-ignore
    return this.form.get(box).touched && !this.form.get(box).hasError('required');
  }

  nextCount() {
    this.data.nextCount();
    console.log(this.count)
  }

}
