import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class EstudiantesService {

  private URL = 'http://localhost:3000';

  constructor(private http: HttpClient) { }

  addEstudiante(est) {
    return this.http.post<any>(`${this.URL}/estudiante`, est);
  }

  getAllEstudiante() {
    return this.http.get<any>(`${this.URL}/estudiante`);
  }

  updateEstudiante(est) {
    return this.http.put<any>(`${this.URL}/estudiante/${est.est_cedula}`, est);
  }

  deleteEstudiante(ced) {
    return this.http.delete<any>(`${this.URL}/estudiante/${ced}`);
  }
}
