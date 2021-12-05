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

  constructor(
    private formBuilder: FormBuilder
  ) {
    this.buildForm();
  }

  ngOnInit(): void {
  }

  save(event: Event) {
    if (this.form.valid) {
      console.log(this.form.value);//con este te da lo del forms de una
      console.log(this.form.value.user);// este es para especificar los nombres son los de buldforms
      console.log(this.form.value.password);
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
}
