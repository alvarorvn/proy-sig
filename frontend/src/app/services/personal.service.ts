import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class PersonalService {

  private URL = 'http://localhost:3000';

  constructor(private http: HttpClient) { }

  getCiudades() {
    return this.http.get<any>(`${this.URL}/personal/ciudades`);
  }

  register(personal) {
    return this.http.post<any>(`${this.URL}/personal`, personal);
  }

  getAllPersonal() {
    return this.http.get<any>(`${this.URL}/personal`);
  }

  getAllPersonalNames() {
    return this.http.get<any>(`${this.URL}/personal/names`);
  }

  updatePersonal(personal) {
    return this.http.put<any>(`${this.URL}/personal/${personal.pers_cedula}`, personal);
  }

  deletePersonal(ced){
    return this.http.delete<any>(`${this.URL}/personal/${ced}`);
  }
}
