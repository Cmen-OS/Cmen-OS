import { Component, OnInit } from '@angular/core';
import {FormControl, Validators, FormGroup, FormBuilder} from '@angular/forms';
import {Taxonomia} from "../../models/taxonomia/taxonomia.model";
import { TaxonomiaService } from "../../services/taxonomia/taxonomia.service";


@Component({
  selector: 'app-taxonomia',
  templateUrl: './taxonomia.component.html',
  styleUrls: ['./taxonomia.component.css']
})
export class TaxonomiaComponent implements OnInit {
  form!: FormGroup;

  taxonomia: Taxonomia = {
    especie: '',
    familia: '',
    orden: '',
    genero: '',
    subespecie: ''
  }

  message = '';

  constructor(    private formBuilder: FormBuilder,
                  private taxonomiaService: TaxonomiaService
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
      this.addTaxonomia()

    } else {
      this.form.markAllAsTouched();
    }
  }

  modificar() {
    if (this.form.valid) {
      console.log(this.form.value);

      const data = {
        especie: this.form.value.especie,
        familia: this.form.value.familia,
        orden: this.form.value.orden,
        genero: this.form.value.genero,
        subespecie: this.form.value.subespecie
      }

      this.message = '';

      this.taxonomiaService.update(data.especie, data).subscribe(response => {
          console.log(response);
          this.message = response.message ? response.message : 'La taxonomia fue actualizada';
        },
        error => {
          console.log(error);
        });
    } else {
      this.form.markAllAsTouched();

    }
  }

  baja() {
    if (this.form.valid) {
      console.log(this.form.value);
      this.taxonomiaService.get(this.form.value.especie)
        .subscribe(
          data => {
            this.taxonomia = data;
            console.log(data);
            this.taxonomiaService.delete(this.taxonomia.especie).subscribe(response => {
                console.log(response);
              },
              error => {
                console.log(error);
              });
          },
          error => {
            console.log(error);
          });

    } else {
      this.form.markAllAsTouched();

    }
  }

  private addTaxonomia() {
    const data = {
      especie: this.form.value.especie,
      familia: this.form.value.familia,
      orden: this.form.value.orden,
      genero: this.form.value.genero,
      subespecie: this.form.value.subespecie
    }

    this.taxonomiaService.create(data).subscribe(response => {
        console.log(response);
      },
      error => {
        console.log(error);
      });
  }
}
