import { Injectable } from '@angular/core';
import {Observable} from "rxjs";
import { HttpClient } from "@angular/common/http";
import { Taxonomia } from "../../models/taxonomia/taxonomia.model";
import {Animal} from "../../models/animal/animal.model";

const baseUrl = 'http://34.139.8.186:8080'
@Injectable({
  providedIn: 'root'
})
export class TaxonomiaService {

  constructor(private http: HttpClient) { }

  get(especie: any): Observable<Taxonomia> {
    return this.http.get(`${baseUrl}/taxonomia/${especie}`);
  }

  create(data: any): Observable<any> {
    return this.http.post(`${baseUrl}/taxonomia`,data)
  }

  update(especie: any, data: any): Observable<any> {
    return this.http.put(`${baseUrl}/taxonomia/${especie}`, data);
  }

  delete(especie: any): Observable<any> {
    return this.http.delete(`${baseUrl}/taxonomia/${especie}`);
  }

  findBy(select: any, selected: any): Observable<Animal[]> {
    return this.http.get<Animal[]>(`${baseUrl}/taxonomia?${select}=${selected}`);
  }
}
