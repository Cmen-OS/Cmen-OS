import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";

@Component({
  selector: 'app-cambiar-animal',
  templateUrl: './cambiar-animal.component.html',
  styleUrls: ['./cambiar-animal.component.css']
})
export class CambiarAnimalComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public data: any,
              private dialogRef: MatDialogRef<CambiarAnimalComponent>) { }

  ngOnInit(): void {
  }



  listaAnimales = this.data


  getAnimal(e: any) {


    this.dialogRef.close({ data: e })



  }

  columns: string[] = [
    'Codigo de identificacion',
    'Nombre comun',
    'Especie',
    'Sexo',
    'Edad'
  ]
}
