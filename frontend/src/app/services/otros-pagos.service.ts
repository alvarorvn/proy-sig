import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class OtrosPagosService {

  private URL = 'http://localhost:3000';

  constructor(private http: HttpClient) { }

  addOtroPago(otro_pago) {
    return this.http.post<any>(`${this.URL}/pagos/o`, otro_pago);
  }

  getAllOtrosPagos() {
    return this.http.get<any>(`${this.URL}/pagos/o`);
  }

  updateOtroPago(otro_pago) {
    return this.http.put<any>(`${this.URL}/pagos/o/${otro_pago.pgotro_id}`, otro_pago);
  }

  deleteOtroPago(pgotro_id) {
    return this.http.delete<any>(`${this.URL}/pagos/o/${pgotro_id}`);
  }
}
