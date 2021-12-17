import { Component, OnInit } from '@angular/core';
import {FormControl, Validators, FormGroup, FormBuilder} from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import {ListaAnimalesComponent} from "../../dialog/lista-animales/lista-animales.component";

@Component({
  selector: 'app-microchip',
  templateUrl: './microchip.component.html',
  styleUrls: ['./microchip.component.css']
})
export class MicrochipComponent implements OnInit {
  form!: FormGroup;
  seachForm!: FormGroup;
  showFieldsText:Boolean = false;

  animal1 =[
    "Este es un nama",
    "Este es un nombre sc",
    "Especie",
    "Sexo",
    "Edad"
  ]

  animal2 =[
    "Este es un nama",
    "Este es un nombre c",
    "Especie",
    "Sexo",
    "Edad"
  ]

  listaDialogAnimales = [this.animal1, this.animal2]
  constructor(      public dialogo: MatDialog,
                    private formBuilder: FormBuilder,
  ) {
    this.buildForm();

  }



  openDialog(listAnm:any) {
    const dialogRef = this.dialogo.open(ListaAnimalesComponent, {
      data: listAnm//aqui se debe poner la lista a mostrar
    } );


    dialogRef.afterClosed().subscribe(res => {
      // received data from dialog-component
      this.showFieldsText = true
      this.seachForm.value.nombre = res.data[0]
      this.seachForm.value.especie = res.data[2]
      this.seachForm.value.nombreCientifico = res.data[1]
      this.seachForm.value.sexo =res.data[3]
      this.seachForm.value.edad = res.data[4]

    });
  }
  ngOnInit(): void {
  }

  private buildForm() {
    this.form = this.formBuilder.group({
      numMicrochip: [''],
      tamanio: ['', Validators.required],
      peso: ['', Validators.required],
      caracteristicasFenotipicas: ['', Validators.required],

      rabia: ['', Validators.required],
      desparacitacion: [''],
      otros: ['', Validators.required],
      tiposDesparacitacion: ['', Validators.required],

      observaciones: ['', Validators.required],
      ciEncargado: ['', Validators.required],





    });
    this.seachForm = this.formBuilder.group({
      selectBox: ['', Validators.required],
      selectedBox: ['', Validators.required],

      nombre: [''],
      especie: [''],
      nombreCientifico: [''],
      sexo: [''],
      edad: [''],

    });

  }

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
  getFormSearchValue(value:String)  {
    // @ts-ignore
    return this.seachForm.get(value)?.value
  }
  isBoxValid(box: String): Boolean {
    // @ts-ignore
    return this.form.get(box).touched && this.form.get(box).hasError('required');
  }
  backToSelect() {
    this.showFieldsText = false;
  }
  isBoxSearchValid(box: String): Boolean {
    // @ts-ignore
    return this.seachForm.get(box).touched && this.seachForm.get(box).hasError('required');
  }

  showFieldText(){
    if (this.showFieldsText == false){
      return {'display' : 'none'};

    }else {
      return {'display' : ''};
    }

  }

  getTextFielValueNombreCientifico(){
    return this.seachForm.value.nombreCientifico
  }

  getTextFielValueNombre(){
    return this.seachForm.value.nombre
  }

  getTextFielValueEspecie(){
    return this.seachForm.value.especie
  }

  getTextFielValueSexo(){
    return this.seachForm.value.sexo
  }

  getTextFielValueEdad(){
    return this.seachForm.value.edad
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

  selectBoxes: string[] = [
    'Nombre',
    'Nombre cientifico',
    'Especie',
    'Sexo',
    'Edad'
  ]
  save(event: Event) {
    if (this.form.valid ) {
      console.log(this.form.value);




    } else {
      this.form.markAllAsTouched();
    }
  }

  onSearch($event: any) {
    if (this.seachForm.valid ) {
      console.log(this.seachForm.value);

      this.openDialog([this.animal2,this.animal1])//aqui poner la lista a mostrar

    } else {
      //this.openDialog([this.animal2,this.animal1])

      this.seachForm.markAllAsTouched();
    }
  }
}
