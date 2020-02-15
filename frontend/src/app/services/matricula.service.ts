import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class MatriculaService {

  private URL = 'http://localhost:3000';

  constructor(private http: HttpClient) { }

  addMatricula(matricula) {
    return this.http.post<any>(`${this.URL}/cobros/m`, matricula);
  }

  getAllMatriculas() {
    return this.http.get<any>(`${this.URL}/cobros/m`);
  }

  consulta1() {
    return this.http.get<any>(`${this.URL}/cobros/mc`);
  }

  updateMatricula(matricula) {
    return this.http.put<any>(`${this.URL}/cobros/m/${matricula.matr_id}`, matricula);
  }

  deleteMatricula(matr_id) {
    return this.http.delete<any>(`${this.URL}/cobros/m/${matr_id}`);
  }
}
