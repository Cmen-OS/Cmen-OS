import {Component, Inject, OnInit} from '@angular/core';

import {MatDialogRef, MatDialog, MatDialogConfig, MAT_DIALOG_DATA} from '@angular/material/dialog';

@Component({
  selector: 'app-lista-animales-microchip',
  templateUrl: './lista-animales-microchip.component.html',
  styleUrls: ['./lista-animales-microchip.component.css']
})
export class ListaAnimalesMicrochipComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public data: any,
              private dialogRef: MatDialogRef<ListaAnimalesMicrochipComponent>) { }

  ngOnInit(): void {
  }



  listaAnimales = this.data


  getAnimal(e: any) {


    this.dialogRef.close({ data: e })



  }
}
