import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-inventario',
  templateUrl: './inventario.component.html',
  styleUrls: ['./inventario.component.css']
})
export class InventarioComponent implements OnInit {
  form!: FormGroup;

  myVar:String = "https://images.unsplash.com/photo-1637354563042-9a1d26500ff5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwxfDB8MXxyYW5kb218MHx8fHx8fHx8MTYzNzk4NjMyMw&ixlib=rb-1.2.1&q=80&w=1080";

  animalTipo:String = "Tigre"
  constructor(    private formBuilder: FormBuilder,
  ) {
    this.buildForm();

  }

  ngOnInit(): void {
  }

  private buildForm() {
    this.form = this.formBuilder.group({
      fechaFin: ['', Validators.required],
      fechaInicio: ['', Validators.required],
      tipoAnimal: ['', Validators.required],



    });
  }
  animales: string[] = [
    'Felino',
    'Canino',

  ]

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
}
