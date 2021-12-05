import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Observable } from 'rxjs';
import { Operador } from '../../models/operador/operador.model';

const baseUrl = 'http://localhost:8080'
@Injectable({
  providedIn: 'root'
})
export class OperadorService {

  constructor(private http: HttpClient) { }

  getAll(): Observable<Operador[]> {
    return this.http.get<Operador[]>(baseUrl);
  }

  get(id: any): Observable<Operador> {
    return this.http.get(`${baseUrl}/${id}`);
  }

  findByEmail(email: any): Observable<Operador[]> {
    return this.http.get<Operador[]>(`${baseUrl}/login?email=${email}`);
  }

  create(data: any): Observable<any> {
    return this.http.post(`${baseUrl}/login`,data)
  }
}
