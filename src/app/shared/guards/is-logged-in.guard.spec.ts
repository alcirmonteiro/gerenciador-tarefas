import { fakeAsync, TestBed } from '@angular/core/testing';
import { provideRouter, Router } from '@angular/router';
import { Location } from '@angular/common';

import { isLoggedInGuard } from './is-logged-in.guard';
import { Component } from '@angular/core';
import { ExpansionCase } from '@angular/compiler';
import { AuthStoreService } from '../stores/auth.store';
import { MockProvider } from 'ng-mocks';

@Component({
  selector: 'app-authenticated-route',
  template: ''
})
class FakeAuthenticatedRouteComponent {}


@Component({
  selector: 'app-login',
  template: ''
})
class FakeLoginComponent {}

describe('isLoggedInGuard', () => {
  let authStoreService: AuthStoreService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        MockProvider(AuthStoreService),
        provideRouter([
          {
            path: 'fake-route',
            canActivate: [isLoggedInGuard],
            component: FakeLoginComponent,
          },
          {
            path: 'login',
            component: FakeLoginComponent,
          }
        ])
      ]
    });
    authStoreService = TestBed.inject(AuthStoreService);
  });

  describe('quando o usuário não estiver autenticado', () => {
    it('deve redirecionar para rota de login', async () => {
      const location = TestBed.inject(Location);
      const router = TestBed.inject(Router);

      expect(location.path()).toBe('');

      (authStoreService.isLoggedIn as jest.Mock).mockReturnValue(false);  
    
      await router.navigate(['fake-route']);
    
      expect(location.path()).toBe('/login');
    });
  });  

  describe('quando o usuário estiver autenticado', () => {
    it('deve manter a navegação ', async () => {
      const location = TestBed.inject(Location);
      const router = TestBed.inject(Router);

      expect(location.path()).toBe('');

      (authStoreService.isLoggedIn as jest.Mock).mockReturnValue(true);  
    
      await router.navigate(['fake-route']);
    
      expect(location.path()).toBe('/fake-route');

    });
  }); 
});
