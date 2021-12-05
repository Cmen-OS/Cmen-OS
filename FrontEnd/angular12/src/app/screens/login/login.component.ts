import { Component, OnInit } from '@angular/core';
import { Operador } from "../../models/operador/operador.model";
import { OperadorService } from "../../services/operador/operador.service";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import { Router } from '@angular/router';

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
    private operadorService: OperadorService,private router: Router
  ) {
    this.buildForm();
  }

  ngOnInit(): void {
  }

  save(event: Event) {
    if (this.form.valid) {
      console.log(this.form.value);//con este te da lo del forms de una
      this.email = this.form.value.user;
      this.getOperadorByEmail();
      // @ts-ignore
      if (this.operador[0].root){
        this.router.navigateByUrl('/admin');
      }else {
        this.router.navigateByUrl('/registro');
      }


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
