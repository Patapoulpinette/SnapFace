import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private token!: string;

  login() {
    this.token = 'MyExampleToken';
  }

  getToken(): string {
    return this.token;
  }
}
