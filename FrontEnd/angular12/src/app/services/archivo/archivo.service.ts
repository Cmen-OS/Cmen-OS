import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import {Observable} from "rxjs";
import {Operador} from "../../models/operador/operador.model";

const baseUrl = 'http://localhost:8080'

@Injectable({
  providedIn: 'root'
})
export class ArchivoService {

  constructor(private http: HttpClient) { }

  create(data: any){
    return this.http.post<any>(`${baseUrl}/archivo`, data)
  }

  get(nombre: any): Observable<Operador> {
    return this.http.get(`${baseUrl}/archivo/${nombre}`);
  }
}
