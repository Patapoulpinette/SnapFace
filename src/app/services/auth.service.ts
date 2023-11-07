import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private token = 'MyExampleToken';

  getToken(): string {
    return this.token;
  }
}
