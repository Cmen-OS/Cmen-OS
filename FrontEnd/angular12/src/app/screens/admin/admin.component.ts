import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import { Operador } from "../../models/operador/operador.model";
import { OperadorService } from "../../services/operador/operador.service";


@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  operador: Operador = {
    ci: '',
    razon_social: '',
    domicilio: '',
    telefono: '',
    email: '',
    nombre: '',
    root: false,
    autorizado: false,
    apellido: '',
    password: '',
  };

  root: string = '';
  autorizado: string = '';
  subido: boolean = false;

  constructor(private operadorService: OperadorService) { }

  ngOnInit(): void {
  }

  addUser(): void {
    this.operador.root = this.root == 'si';

    this.operador.autorizado = this.autorizado == 'si';

    const data = {
      ci: this.operador.ci,
      razon_social: this.operador.ci,
      domicilio: this.operador.domicilio,
      telefono: this.operador.telefono,
      email: this.operador.email,
      nombre: this.operador.nombre,
      root: this.operador.root,
      autorizado: this.operador.autorizado,
      apellido: this.operador.apellido,
      password: this.operador.password
    }

    this.operadorService.create(data).subscribe(response => {
        console.log(response);
        this.subido = true;
      },
      error => {
        console.log(error);
      });
  }

}

