import { Component, OnInit } from '@angular/core';
import {FormControl, Validators, FormGroup, FormBuilder} from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
//import { MatDialog } from '@angular/material/dialog/dialog';
import {ListaAnimalesComponent} from "../../dialog/lista-animales/lista-animales.component";
import {ListaAnimalesMicrochipComponent} from "../../dialog/lista-animales-microchip/lista-animales-microchip.component";

import { MicrochipService } from "../../services/microchip/microchip.service";
import {AnimalService} from "../../services/animal/animal.service";
import {Animal} from "../../models/animal/animal.model";

@Component({
  selector: 'app-microchip',
  templateUrl: './microchip.component.html',
  styleUrls: ['./microchip.component.css']
})
export class MicrochipComponent implements OnInit {
  form!: FormGroup;
  seachForm!: FormGroup;
  showFieldsText:Boolean = false;
  date: Date = new Date();

  animal: Animal[] = [];

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
                    private microchipService: MicrochipService,
                    private animalService: AnimalService,
  ) {
    this.buildForm();

  }



  openDialog(listAnm:any) {
    const dialogRef = this.dialogo.open(ListaAnimalesMicrochipComponent, {
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
      this.seachForm.value.codigoId = res.data[5]


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
      codigoId: [''],


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

  getTextFielValueCod(){
    return this.seachForm.value.codigoId
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


      const uploadDataReg = new FormData();
      uploadDataReg.append('nro', this.form.value.numMicrochip);
      uploadDataReg.append('fecha', this.date.getFullYear().toString()+'-'+this.date.getMonth().toString()+'-'+this.date.getDate().toString());
      uploadDataReg.append('peso', this.form.value.peso);
      uploadDataReg.append('tamano', this.form.value.tamanio);
      uploadDataReg.append('caracteristicas_fenotipicas', this.form.value.caracteristicasFenotipicas);
      uploadDataReg.append('datos_vacunacion', this.form.value.rabia+', '+this.form.value.desparacitacion
        + ' se desparasito, ' + this.form.value.tiposDesparacitacion + ', ' + this.form.value.otros);
      uploadDataReg.append('observaciones', this.form.value.observaciones);
      uploadDataReg.append('nombre', this.form.value.encargado);


      this.microchipService.create(uploadDataReg).subscribe(response => {
          console.log(response);
        },
        error => {
          console.log(error);
        });



    } else {
      this.form.markAllAsTouched();
    }
  }


  onSearch($event: any) {
    if (this.seachForm.valid ) {
      console.log(this.seachForm.value);

      if (this.seachForm.value.selectBox == 'Nombre'){
        this.animalService.findBy('nombre_propio', this.seachForm.value.selectedBox).subscribe(
          data => {
            this.animal = data;
            var aux: string[][]=[];

            for(let i of this.animal){
              // @ts-ignore
              aux.push([i.nombre_propio.toString(), i.nombre_criollo.toString(), i.especie_id.toString(), i.sexo.toString(), i.edad.toString()])
            }

            this.openDialog(aux)//aqui enviar la lista a mostrar
            console.log(data);},
          error => {
            console.log(error)
          })
      }else if(this.seachForm.value.selectBox == 'Nombre cientifico'){
        this.animalService.findBy('nombre_criollo', this.seachForm.value.selectedBox).subscribe(
          data => {
            this.animal = data;
            var aux: string[][]=[];

            for(let i of this.animal){
              // @ts-ignore
              aux.push([i.nombre_propio.toString(), i.nombre_criollo.toString(), i.especie_id.toString(), i.sexo.toString(), i.edad.toString()])
            }

            this.openDialog(aux)
            console.log(data);},
          error => {
            console.log(error)
          })
      }else if(this.seachForm.value.selectBox == 'Especie') {
        this.animalService.findBy('especie', this.seachForm.value.selectedBox).subscribe(
          data => {
            this.animal = data;
            var aux: string[][]=[];

            for(let i of this.animal){
              // @ts-ignore
              aux.push([i.nombre_propio.toString(), i.nombre_criollo.toString(), i.especie_id.toString(), i.sexo.toString(), i.edad.toString()])
            }

            this.openDialog(aux)
            console.log(data);
          },
          error => {
            console.log(error)
          })
      }else if(this.seachForm.value.selectBox == 'Sexo') {
        this.animalService.findBy('sexo', this.seachForm.value.selectedBox).subscribe(
          data => {
            this.animal = data;
            var aux: string[][]=[];

            for(let i of this.animal){
              // @ts-ignore
              aux.push([i.nombre_propio.toString(), i.nombre_criollo.toString(), i.especie_id.toString(), i.sexo.toString(), i.edad.toString()])
            }

            this.openDialog(aux)
            console.log(data);
          },
          error => {
            console.log(error)
          })
      }else if(this.seachForm.value.selectBox == 'Edad') {
        this.animalService.findBy('edad', this.seachForm.value.selectedBox).subscribe(
          data => {
            this.animal = data;
            var aux: string[][]=[];

            for(let i of this.animal){
              // @ts-ignore
              aux.push([i.nombre_propio.toString(), i.nombre_criollo.toString(), i.especie_id.toString(), i.sexo.toString(), i.edad.toString()])
            }

            this.openDialog(aux)
            console.log(data);
          },
          error => {
            console.log(error)
          })
      }

    } else {
      //this.openDialog([this.animal2,this.animal1])

      this.seachForm.markAllAsTouched();
    }
  }
}
