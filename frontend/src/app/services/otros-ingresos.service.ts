import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class OtrosIngresosService {

  private URL = 'http://localhost:3000';

  constructor(private http: HttpClient) { }

  addIngreso(ingreso) {
    return this.http.post<any>(`${this.URL}/cobros/o`, ingreso);
  }

  getAllIngresos() {
    return this.http.get<any>(`${this.URL}/cobros/o`);
  }

  updateIngreso(ingreso) {
    return this.http.put<any>(`${this.URL}/cobros/o/${ingreso.ingr_id}`, ingreso);
  }

  deleteIngreso(ingr_id) {
    return this.http.delete<any>(`${this.URL}/cobros/o/${ingr_id}`);
  }
}
