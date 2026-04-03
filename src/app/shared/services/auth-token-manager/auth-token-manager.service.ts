import { inject, Injectable } from '@angular/core';
import { LocalStorageToken } from '../../tokens/local-storage.token';

@Injectable({
  providedIn: 'root'
})
export class AuthTokenManagerService {

  #tokenKey = 'auth-token';

  localStorageToken = inject(LocalStorageToken);

  constructor() { }

  setToken(token: string): void {
    this.localStorageToken.setItem(this.#tokenKey, token);
  };
}
