import { Component, OnInit } from '@angular/core';
import { Operador } from "../../models/operador/operador.model";
import { OperadorService } from "../../services/operador/operador.service";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})



export class LoginComponent implements OnInit {
  form!: FormGroup;
  o:Operador = {};
  operador?: Operador[];
  email = '';

  constructor(
    private formBuilder: FormBuilder,
    private operadorService: OperadorService,
  ) {
    this.buildForm();
  }

  ngOnInit(): void {
  }

  save(event: Event) {
    if (this.form.valid) {
      console.log(this.form.value);//con este te da lo del forms de una
      this.email = this.form.value.user;
      this.getOperadorByEmail()
      //Con el metodo de arriba deberias pedir los valores de los operadores. y se guardan en la lista operador, como operador solo tendra solo un valor siempre eliges el primer valor
      //todo en este if es en el que se agrega a la db
    } else {

      this.form.markAllAsTouched();
    }
  }

  private buildForm() {
    this.form = this.formBuilder.group({
      user: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  isBoxValid(box: String): Boolean {
    // @ts-ignore
    return this.form.get(box).touched && this.form.get(box).hasError('required');
  }

  getOperadorByEmail(): void {
    this.operadorService.findByEmail(this.email)
      .subscribe(
        data => {
          this.operador = data;
        console.log(data);},
        error => {
          console.log(error)
        })
  }
}
