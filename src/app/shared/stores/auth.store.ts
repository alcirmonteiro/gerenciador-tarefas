import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthStoreService {

  #state = false;

  isLoggedIn(): boolean {
    return this.#state;
  }

  setAsLoggedIn(): void {
    this.#state = true;
  }

}
