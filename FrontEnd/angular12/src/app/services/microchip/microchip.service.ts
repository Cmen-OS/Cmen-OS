import { Injectable } from '@angular/core';
import {Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";


const baseUrl = 'http://localhost:8080'
@Injectable({
  providedIn: 'root'
})
export class MicrochipService {

  constructor(private http: HttpClient) { }

  create(data: any): Observable<any> {
    return this.http.post(`${baseUrl}/microchip`,data)
  }
}

