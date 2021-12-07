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
  imagen?: File;
  count = 0;
  auxFile: any;

  auxAnimal: any;

  date: Date = new Date();

  operadores: Operador[] = [];

  microchip: Microchip = {};

  taxonomia: Taxonomia = {};

  operador: Operador = {};

  animal: Animal = {};


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

      this.crearAnimal();

      const uploadDataReg = new FormData();
      uploadDataReg.append('nro_acta_decomiso', this.form.value.numActa);
      uploadDataReg.append('fecha_registro', this.date.getFullYear().toString()+'-'+this.date.getMonth().toString()+'-'+this.date.getDate().toString());
      uploadDataReg.append('CCFS', this.form.value.ccfs);
      uploadDataReg.append('modalidad_funcionamiento', this.form.value.modFuncionamiento);
      uploadDataReg.append('area', this.form.value.areaIngreso);
      uploadDataReg.append('lugar_exposicion', this.form.value.lugarExp);
      uploadDataReg.append('motivo_recepcion', this.form.value.motivoIngreso);
      uploadDataReg.append('nro_acta_traslado', this.form.value.numAutorizacion);
      uploadDataReg.append('nro_MMAA', this.form.value.numFormMMAA);
      uploadDataReg.append('id_animal_id', this.auxAnimal.nombreCriollo);

      uploadDataReg.append('ci_autorizado_por_id', this.operador.ci);
      // @ts-ignore
      uploadDataReg.append('ci_recibido_por_id', this.operador.ci);



      this.registroService.create(uploadDataReg).subscribe(data => console.log(data), error => console.log(error))

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

      estadoSaludes: ['', Validators.required],
      detalleSaludes: ['', Validators.required],




      image: [''],
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


  crearAnimal(){
    const uploadDataAnimal = new FormData();
    uploadDataAnimal.append('nombre_criollo', this.form.value.nombreCriollo);
    uploadDataAnimal.append('nombre_comun', this.form.value.nombreComun);
    uploadDataAnimal.append('nombre_propio', this.form.value.nombrePropio);
    uploadDataAnimal.append('edad', this.form.value.edad);
    uploadDataAnimal.append('procedencia', this.form.value.precedencia);
    uploadDataAnimal.append('fecha_recepcion', this.form.value.fechaRecepcion);
    uploadDataAnimal.append('sexo', this.form.value.sexo);
    uploadDataAnimal.append('estado_salud', this.form.value.estadoSaludes);
    uploadDataAnimal.append('detalles_salud', this.form.value.detalleSaludes);
    uploadDataAnimal.append('cod_int_id', this.form.value.microchip);
    uploadDataAnimal.append('especie_id', this.form.value.taxonomia);
    uploadDataAnimal.append('ruta_archivo_id', 'C:\\Users\\hpzbook15\\PycharmProjects\\DJANG-OS\\media\\covers\\' + this.imagen?.name + '\\' + this.imagen?.name)

    this.animalService.create(uploadDataAnimal).subscribe(data => console.log(data), error => console.log(error));

    this.auxAnimal = uploadDataAnimal;

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
  }


  uploadFile(event:any){
    //todo subir a la base de datos
    this.imagen = event.target.files[0]
    const uploadDataFile = new FormData();
    uploadDataFile.append('ruta', 'C:\\Users\\hpzbook15\\PycharmProjects\\DJANG-OS\\media\\covers\\' + this.imagen?.name + '\\' + this.imagen?.name)
    // @ts-ignore
    uploadDataFile.append('peso', this.imagen?.size.toString())
    // @ts-ignore
    uploadDataFile.append('nombre', this.imagen?.name)
    uploadDataFile.append('creado', this.date.getFullYear().toString()+'-'+this.date.getMonth().toString()+'-'+this.date.getDate().toString())
    // @ts-ignore
    uploadDataFile.append('tipo', this.imagen?.name[-4])
    // @ts-ignore
    uploadDataFile.append('file', this.imagen)
    this.archivoService.create(uploadDataFile).subscribe(data => console.log(data), error => console.log(error));

    this.auxFile = uploadDataFile
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
