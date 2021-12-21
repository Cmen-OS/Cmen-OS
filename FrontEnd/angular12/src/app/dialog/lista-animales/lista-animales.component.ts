import {Component, Inject, OnInit} from '@angular/core';
import {MatDialogRef, MatDialog, MatDialogConfig, MAT_DIALOG_DATA} from '@angular/material/dialog';

@Component({
  selector: 'app-lista-animales',
  templateUrl: './lista-animales.component.html',
  styleUrls: ['./lista-animales.component.css']
})
export class ListaAnimalesComponent implements OnInit {



  constructor(@Inject(MAT_DIALOG_DATA) public data: any,
              private dialogRef: MatDialogRef<ListaAnimalesComponent>) { }

  ngOnInit(): void {
  }



  listaAnimales = this.data


  getAnimal(e: any) {


    this.dialogRef.close({ data: e })



  }
}
