import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {DataService} from "../../data.service";
import {OperadorService} from "../../services/operador/operador.service";
import {ArchivoService} from "../../services/archivo/archivo.service";
import {AnimalService} from "../../services/animal/animal.service";
import {RegistroService} from "../../services/registro/registro.service";
import {Animal} from "../../models/animal/animal.model";
import {BajaService} from "../../services/baja/baja.service";

@Component({
  selector: 'app-baja',
  templateUrl: './baja.component.html',
  styleUrls: ['./baja.component.css']
})
export class BajaComponent implements OnInit {
  form!: FormGroup;
  seachForm!: FormGroup;
  showFieldsText:Boolean = false;
  count = 0;

  animal: Animal[] = [];

  file1?: File;
  file2?: File;

  date: Date = new Date();


  constructor(
    private operadorService: OperadorService,
    private archivoService: ArchivoService,
    private animalService: AnimalService,
    private registroService: RegistroService,
    private bajaService: BajaService,
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

      const uploadDataReg = new FormData();
      uploadDataReg.append('CCFS', this.form.value.ccfs);
      uploadDataReg.append('fecha', this.date.getFullYear().toString()+'-'+this.date.getMonth().toString()+'-'+this.date.getDate().toString());
      uploadDataReg.append('fecha_deceso', this.form.value.fechaDeceso);
      uploadDataReg.append('modalidad_funcionamiento', this.form.value.modFuncionamiento);
      uploadDataReg.append('nombre_guarda_fauna', this.form.value.nombreGuarda);
      uploadDataReg.append('nombre_veterinario', this.form.value.nombreVeterinario);
      uploadDataReg.append('nombre_director', this.form.value.nombreDirector);
      uploadDataReg.append('nro_MMAA', this.form.value.numFormMMAA);
      uploadDataReg.append('motivo_salida', this.form.value.motivoSalida);
      uploadDataReg.append('causa_deceso', this.form.value.causasDeceso);
      uploadDataReg.append('lesiones', this.form.value.lesionesEncontradas);
      uploadDataReg.append('diagnostico_deceso', this.form.value.diagnosticoFinal);
      uploadDataReg.append('ci', this.form.value.ci);
      uploadDataReg.append('direccion_archivo', 'C:\\Users\\hpzbook15\\PycharmProjects\\DJANG-OS\\media\\covers\\' + this.file1?.name + '\\' + this.file1?.name);
      uploadDataReg.append('direccion_archivo_laboratorio', 'C:\\Users\\hpzbook15\\PycharmProjects\\DJANG-OS\\media\\covers\\' + this.file2?.name + '\\' + this.file2?.name);
      uploadDataReg.append('id_animal_id', this.animal[0].id);

      this.bajaService.create(uploadDataReg).subscribe(data => console.log(data), error => console.log(error))


    } else {
      this.form.markAllAsTouched();
      console.log(this.count)
    }
  }
  private buildForm() {
    this.form = this.formBuilder.group({
      ccfs: ['', Validators.required],
      numMMAA: ['', Validators.required],
      modalidadFun: ['', Validators.required],


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
      precedencia: ['', Validators.required],


      informeForense: ['', Validators.required],
      informeLab: ['', Validators.required],
      otro: ['', Validators.required],
    });

    this.seachForm = this.formBuilder.group({
      selectBox: ['', Validators.required],
      selectedBox: ['', Validators.required],

      codIdentificacion: [''],
      especie: [''],
      nombreComun: [''],
      sexo: [''],
      edad: [''],

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

  selectBoxes: string[] = [
    'Codigo de identificacion',
    'Nombre comun',
    'Especie',
    'Sexo',
    'Edad'
  ]

  showSelectedBox(){
    if (this.getFormSearchValue("selectBox") == ''){
      return {'display' : 'none'};

    }else if(this.getFormSearchValue("selectBox") != '' && this.showFieldsText == true){
      return {'display' : 'none'};

    } else {
      return {'display' : ''};
    }

  }

  showComboBox(){
    if(this.showFieldsText == true){
      return {'display' : 'none'};
    }else {
      return {'display' : ''};
    }
  }

  showFieldText(){
    if (this.showFieldsText == false){
      return {'display' : 'none'};

    }else {
      return {'display' : ''};
    }

  }

  isBoxValid(box: String): Boolean {
    // @ts-ignore
    return this.form.get(box).touched && this.form.get(box).hasError('required');
  }

  getFormSearchValue(value:String)  {
    // @ts-ignore
    return this.seachForm.get(value)?.value
  }

  isBoxSearchValid(box: String): Boolean {
    // @ts-ignore
    return this.seachForm.get(box).touched && this.seachForm.get(box).hasError('required');
  }

  onSearch($event: any) {
    if (this.seachForm.valid) {//este es donde busca
      console.log(this.seachForm.value);
      this.showFieldsText = true

      this.animalService.findBy(this.seachForm.value.selectedBox).subscribe(
        data => {
          this.animal = data;
          this.seachForm.value.codIdentificacion = this.animal[0].id;
          this.seachForm.value.especie = this.animal[0].especie_id;
          this.seachForm.value.nombreComun = this.animal[0].nombre_comun;
          this.seachForm.value.sexo = this.animal[0].sexo;
          this.seachForm.value.edad = this.animal[0].edad;
          console.log(data);},
        error => {
          console.log(error)
        })

    } else {
      this.seachForm.markAllAsTouched();
    }
  }

  backToSelect() {
    this.showFieldsText = false;
  }

  getTextFielValueID(){
    return this.seachForm.value.codIdentificacion
  }

  getTextFielValueNombreComun(){
    return this.seachForm.value.nombreComun
  }

  getTextFielValueEspecie(){
    return this.seachForm.value.especie
  }

  uploadFileForense(event: any) {
    // @ts-ignore
    this.file1 = event.target.files[0]
    const uploadDataFile1 = new FormData();

    uploadDataFile1.append('ruta', 'C:\\Users\\hpzbook15\\PycharmProjects\\DJANG-OS\\media\\covers\\' + this.file1?.name + '\\' + this.file1?.name)
    // @ts-ignore
    uploadDataFile1.append('peso', this.file1?.size.toString())
    // @ts-ignore
    uploadDataFile1.append('nombre', this.file1?.name)
    uploadDataFile1.append('creado', this.date.getFullYear().toString()+'-'+this.date.getMonth().toString()+'-'+this.date.getDate().toString())
    // @ts-ignore
    uploadDataFile1.append('tipo', this.file1?.name[-4])
    // @ts-ignore
    uploadDataFile1.append('file', this.file1)
    this.archivoService.create(uploadDataFile1).subscribe(data => console.log(data), error => console.log(error));
}
  getTextFielValueSexo(){
    return this.seachForm.value.sexo
  }

  getTextFielValueEdad(){
    return this.seachForm.value.edad
  }

  uploadFilLaboratorioe(event: any) {
    this.file2 = event.target.files[0]
    const uploadDataFile2 = new FormData();

    uploadDataFile2.append('ruta', 'C:\\Users\\hpzbook15\\PycharmProjects\\DJANG-OS\\media\\covers\\' + this.file2?.name + '\\' + this.file2?.name)
    // @ts-ignore
    uploadDataFile2.append('peso', this.file2?.size.toString())
    // @ts-ignore
    uploadDataFile2.append('nombre', this.file2?.name)
    uploadDataFile2.append('creado', this.date.getFullYear().toString()+'-'+this.date.getMonth().toString()+'-'+this.date.getDate().toString())
    // @ts-ignore
    uploadDataFile2.append('tipo', this.file2?.name[-4])
    // @ts-ignore
    uploadDataFile2.append('file', this.file2)
    this.archivoService.create(uploadDataFile2).subscribe(data => console.log(data), error => console.log(error));
  }
}
