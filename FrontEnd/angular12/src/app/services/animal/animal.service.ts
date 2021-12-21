import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Operador} from "../../models/operador/operador.model";
import {Animal} from "../../models/animal/animal.model";

const baseUrl = 'http://34.139.8.186:8080'

@Injectable({
  providedIn: 'root'
})
export class AnimalService {

  constructor(private http: HttpClient) { }

  create(data: any): Observable<any> {
    return this.http.post(`${baseUrl}/animal`,data)
  }

  findBy(select: any, selected: any): Observable<Animal[]> {
    return this.http.get<Animal[]>(`${baseUrl}/animal?${select}=${selected}`);
  }

  update(id: any, data: any): Observable<any> {
    return this.http.put(`${baseUrl}/animal/${id}`, data);
  }

  updateTax(data: any): Observable<any> {
    return this.http.put(`${baseUrl}/animal`, data);
  }
}
