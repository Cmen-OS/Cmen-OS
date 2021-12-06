import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";

const baseUrl = 'http://localhost:8080'

@Injectable({
  providedIn: 'root'
})
export class ArchivoService {

  constructor(private http: HttpClient) { }

  create(data: any){
    return this.http.post<any>(`${baseUrl}/archivo`, data)
  }
}
