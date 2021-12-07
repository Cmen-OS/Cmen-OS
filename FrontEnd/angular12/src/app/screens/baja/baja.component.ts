import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {DataService} from "../../data.service";

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

  date: Date = new Date();


  constructor(
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
      uploadDataReg.append('ruta', this.form.value.numActa);
      uploadDataReg.append('ruta', this.form.value.numActa);
      uploadDataReg.append('id_animal_id', this.form.value.numActa);


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


    } else {
      this.seachForm.markAllAsTouched();
    }
  }

  backToSelect() {
    this.showFieldsText = false;
  }

  getTextFielValue(){
    return "Aqui iria el valor"//todo ver coomo pedir de la db
  }
}
