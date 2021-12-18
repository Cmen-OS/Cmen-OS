import { Component, OnInit } from '@angular/core';
import {FormControl, Validators, FormGroup, FormBuilder} from '@angular/forms';
import {Taxonomia} from "../../models/taxonomia/taxonomia.model";
import { TaxonomiaService } from "../../services/taxonomia/taxonomia.service";
import { MatDialog } from '@angular/material/dialog';
import {ListaAnimalesComponent} from "../../dialog/lista-animales/lista-animales.component";
import {CambiarAnimalComponent} from "../../dialog/cambiar-animal/cambiar-animal.component";


@Component({
  selector: 'app-taxonomia',
  templateUrl: './taxonomia.component.html',
  styleUrls: ['./taxonomia.component.css']
})
export class TaxonomiaComponent implements OnInit {
  form!: FormGroup;
  seachForm!: FormGroup;
  showFieldsText:Boolean = false;

  taxonomia: Taxonomia = {
    especie: '',
    familia: '',
    orden: '',
    genero: '',
    subespecie: ''
  }

  message = '';

  constructor(
    public dialogo: MatDialog,

    private formBuilder: FormBuilder,
    private taxonomiaService: TaxonomiaService
  ) {
    this.buildForm();

  }

  ngOnInit(): void {
  }
  animal1 =[
    "Este es un ",
    "Este es un  ",
    "Especie",
    "Sexo",
    "Edad"
  ]

  animal2 =[
    "Este es un codigo2",
    "Este es un nombre comun",
    "Especie",
    "Sexo",
    "Edad"
  ]
  openDialog(listaAnm:any) {
    const dialogRef = this.dialogo.open(CambiarAnimalComponent, {
      data: listaAnm//aqui se debe poner la lista a mostrar
    } );


    dialogRef.afterClosed().subscribe(res => {
      // received data from dialog-component
      this.showFieldsText = true
      this.seachForm.value.codIdentificacion = res.data[0]
      this.seachForm.value.especie = res.data[2]
      this.seachForm.value.nombreComun = res.data[1]
      this.seachForm.value.sexo =res.data[3]
      this.seachForm.value.edad = res.data[4]

    });
  }
  private buildForm() {
    this.form = this.formBuilder.group({
      orden: ['', Validators.required],
      familia: ['', Validators.required],
      genero: ['', Validators.required],
      especie: ['', Validators.required],
      subespecie: ['', Validators.required],

      microchip: [''],
      taxonomia: [''],


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

  isBoxValid(box: String): Boolean {
    // @ts-ignore
    return this.form.get(box).touched && this.form.get(box).hasError('required');
  }

  save(event: Event) {
    if (this.form.valid ) {
      console.log(this.form.value);
      this.addTaxonomia()

    } else {
      this.form.markAllAsTouched();
    }
  }

  modificar() {
    if (this.form.valid) {
      console.log(this.form.value);

      const data = {
        especie: this.form.value.especie,
        familia: this.form.value.familia,
        orden: this.form.value.orden,
        genero: this.form.value.genero,
        subespecie: this.form.value.subespecie
      }

      this.message = '';

      this.taxonomiaService.update(data.especie, data).subscribe(response => {
          console.log(response);
          this.message = response.message ? response.message : 'La taxonomia fue actualizada';
        },
        error => {
          console.log(error);
        });
    } else {
      this.form.markAllAsTouched();

    }
  }

  baja() {
    if (this.form.valid) {
      console.log(this.form.value);
      this.taxonomiaService.get(this.form.value.especie)
        .subscribe(
          data => {
            this.taxonomia = data;
            console.log(data);
            this.taxonomiaService.delete(this.taxonomia.especie).subscribe(response => {
                console.log(response);
              },
              error => {
                console.log(error);
              });
          },
          error => {
            console.log(error);
          });

    } else {
      this.form.markAllAsTouched();

    }
  }
  onSearch($event: any) {
    if (this.seachForm.valid) {//este es donde busca
      console.log(this.seachForm.value);
      this.showFieldsText = true
      // @ts-ignore


      //todo aqui buscar  el animal como en baja y que te de una lista  y ponerlo en el open dialog de aca abajo, luego ir a modificarAnimal()
      this.openDialog([this.animal1, this.animal2])//aqui enviar la lista a mostrar


    } else {
     // this.openDialog([this.animal2,this.animal1])
      this.seachForm.markAllAsTouched();
    }
  }
  backToSelect() {
    this.showFieldsText = false;
  }

  isBoxSearchValid(box: String): Boolean {
    // @ts-ignore
    return this.seachForm.get(box).touched && this.seachForm.get(box).hasError('required');
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
  getFormSearchValue(value:String)  {
    // @ts-ignore
    return this.seachForm.get(value)?.value
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

  getTextFielValueSexo(){
    return this.seachForm.value.sexo
  }

  getTextFielValueEdad(){
    return this.seachForm.value.edad
  }

  private addTaxonomia() {
    const data = {
      especie: this.form.value.especie,
      familia: this.form.value.familia,
      orden: this.form.value.orden,
      genero: this.form.value.genero,
      subespecie: this.form.value.subespecie
    }

    this.taxonomiaService.create(data).subscribe(response => {
        console.log(response);
      },
      error => {
        console.log(error);
      });
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
  selectBoxes: string[] = [
    'Codigo de identificacion',
    'Nombre comun',
    'Especie',
    'Sexo',
    'Edad'
  ]

  modificarAnimal() {
    //todo aqui modoficar el animal los campos son microchip y taxonomia de form, no son obligatorios
    //esto pasa cuando presionas modificar animal
  }
}
