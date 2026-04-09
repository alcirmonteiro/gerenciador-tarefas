import { Injectable } from '@angular/core';
import { BehaviorSubject, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthStoreService {

  #state = false;
  #state$ = new BehaviorSubject<boolean>(this.#state);

  isLoggedIn(): boolean {
    return this.#state;
  }

  setAsLoggedIn(): void {
    this.#state = true;
    this.#state$.next(this.#state);
  }

  isLoggedIn$() {
    return this.#state$.asObservable();
  }    

  setAsLoggedOut(): void {
    this.#state = false;
    this.#state$.next(this.#state);
  }


}
