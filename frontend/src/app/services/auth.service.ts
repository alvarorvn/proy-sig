import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private URL = 'http://localhost:3000';

  constructor(
    private http: HttpClient,
    private router: Router
  ) { }

  login(user) {
    return this.http.post<any>(`${this.URL}/login`, user);
  }

  register(user) {
    return this.http.post<any>(`${this.URL}/register`, user);
  }

  getRoles() {
    return this.http.get<any>(`${this.URL}/roles`);
  }

  loggedIn() {
    return !!localStorage.getItem('token');
  }

  getRol() {
    return localStorage.getItem('rol');
  }

  getToken() {
    return localStorage.getItem('token');
  }

  logout() {
    localStorage.removeItem('rol');
    localStorage.removeItem('token');
    this.router.navigate(['/login']);
  }
}
