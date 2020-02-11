import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class PagoPersonalService {

  private URL = 'http://localhost:3000';

  constructor(private http: HttpClient) { }

  getMeses() {
    return this.http.get<any>(`${this.URL}/pagos/meses`);
  }

  getAnios() {
    return this.http.get<any>(`${this.URL}/pagos/anios`);
  }

  save(pago_pers) {
    return this.http.post<any>(`${this.URL}/pagos`, pago_pers);
  }

  getAllPagosPersonal() {
    return this.http.get<any>(`${this.URL}/pagos`);
  }

  updatePagoPersonal(pago_pers) {
    return this.http.put<any>(`${this.URL}/pagos/${pago_pers.pgdoc_id}`, pago_pers);
  }

  deletePagoPersonal(pgdoc_id) {
    return this.http.delete<any>(`${this.URL}/pagos/${pgdoc_id}`);
  }
}
