import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class PensionesService {

  private URL = 'http://localhost:3000';

  constructor(private http: HttpClient) { }

  save(pension) {
    return this.http.post<any>(`${this.URL}/cobros/p`, pension);
  }

  getAllPensiones() {
    return this.http.get<any>(`${this.URL}/cobros/p`);
  }

  getTodasPensiones() {
    return this.http.get<any>(`${this.URL}/cobros/pens`);
  }

  updatePension(pension) {
    return this.http.put<any>(`${this.URL}/cobros/p/${pension.pens_id}`, pension);
  }

  deletePension(pens_id) {
    return this.http.delete<any>(`${this.URL}/cobros/p/${pens_id}`);
  }
}
