import { AuthService } from './../auth/auth.service';
import { inject, Injectable } from '@angular/core';
import { tap } from 'rxjs';
import { AuthStoreService } from '../../stores/auth.store';

@Injectable({
  providedIn: 'root'
})
export class LoginFacadeService {
  authStore = inject(AuthStoreService);
  authService = inject(AuthService);

  login(email: string, password: string) {
    return this.authService.login(email, password)
      .pipe(tap(() => this.authStore.setAsLoggedIn()));

  } 
   
}
