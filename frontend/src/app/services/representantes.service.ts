import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class RepresentantesService {

  private URL = 'http://localhost:3000';

  constructor(private http: HttpClient) { }

  getCiudades() {
    return this.http.get<any>(`${this.URL}/personal/ciudades`);
  }

  addRepresentante(repre) {
    return this.http.post<any>(`${this.URL}/representante`, repre);
  }

  getAllRepresentante() {
    return this.http.get<any>(`${this.URL}/representante`);
  }

  updateRepresentante(repre) {
    return this.http.put<any>(`${this.URL}/representante/${repre.rep_cedula}`, repre);
  }

  deleteRepresentante(ced){
    return this.http.delete<any>(`${this.URL}/representante/${ced}`);
  }
}
