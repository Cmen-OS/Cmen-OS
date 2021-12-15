import { Component, OnInit } from '@angular/core';
import {FormControl, Validators, FormGroup, FormBuilder} from '@angular/forms';

@Component({
  selector: 'app-taxonomia',
  templateUrl: './taxonomia.component.html',
  styleUrls: ['./taxonomia.component.css']
})
export class TaxonomiaComponent implements OnInit {
  form!: FormGroup;

  constructor(    private formBuilder: FormBuilder,
  ) {
    this.buildForm();

  }

  ngOnInit(): void {
  }


  private buildForm() {
    this.form = this.formBuilder.group({
      orden: ['', Validators.required],
      familia: ['', Validators.required],
      genero: ['', Validators.required],
      especie: ['', Validators.required],
      subespecie: ['', Validators.required],



    });
  }

  isBoxValid(box: String): Boolean {
    // @ts-ignore
    return this.form.get(box).touched && this.form.get(box).hasError('required');
  }

  save(event: Event) {
    if (this.form.valid ) {
      console.log(this.form.value);


    } else {
      this.form.markAllAsTouched();
    }
  }

  modificar() {
    //boton modifica
  }

  baja() {
    //boton dar de baja
  }
}
