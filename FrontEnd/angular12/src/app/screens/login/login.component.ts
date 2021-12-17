import { Component, OnInit } from '@angular/core';
import { Operador } from "../../models/operador/operador.model";
import { OperadorService } from "../../services/operador/operador.service";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";

import {DataService} from "../../data.service";
import {HeaderComponent} from "../../header/header.component";
import { CookieService } from 'ngx-cookie-service';
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

  showError:Boolean = false;


  count = 0;




  constructor(
    private router: Router,

    private  cookieService:CookieService,
    private data:DataService,
    private formBuilder: FormBuilder,
    private operadorService: OperadorService,


  ) {
    this.buildForm();
  }

  ngOnInit(): void {
    this.data.count.subscribe(c => {
      this.count = c;
    });



  }

  save(event: Event) {
    if (this.form.valid) {
      console.log(this.form.value);//con este te da lo del forms de una
      this.email = this.form.value.user;
      this.operadorService.findByEmail(this.email)
        .subscribe(
          data => {
            this.operador = data;
            if (this.operador[0].password == this.form.value.password){
              // @ts-ignore
              if (this.operador[0].root){

          localStorage.setItem('user','admin')
          this.cookieService.set('logged', "admin", 4, "/")
          this.router.navigateByUrl('/admin', { state: { isAdmin: true} });
          console.log("Log as admin")

        }else {
          localStorage.setItem('user','user')
          this.cookieService.set('logged', "user", 4, "/")

          this.router.navigateByUrl('/registro');
          console.log("Log as user")

        }
      }else {

              this.showError = true
            }
            console.log(data);},
          error => {
            console.log(error)
          })

    } else {

      //Descomentar para poder loguearte sin conectar la bd

      var temp = "admin"//poner "user" si se quiere ser usuario, si se pone otra cosa s=no dejara
      localStorage.setItem('user',temp)
      this.cookieService.set('logged', temp, 4, "/")

      this.router.navigateByUrl('/registro');
      console.log("Log as " + this.cookieService.get('logged'))



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

  showFieldText() {
    if (this.showError){
      return {'display' : ''};

    }else {
      return {'display' : 'none'};
    }
  }

  nextCount() {
    this.data.nextCount();
    console.log(this.count)
  }




}
