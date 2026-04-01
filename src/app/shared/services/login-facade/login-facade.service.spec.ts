import { fakeAsync, TestBed, tick } from '@angular/core/testing';

import { LoginFacadeService } from './login-facade.service';
import exp from 'constants';
import { MockProviders } from 'ng-mocks';
import { AuthService } from '../auth/auth.service';
import { AuthStoreService } from '../../stores/auth.store';
import { of } from 'rxjs';

describe('LoginFacadeService', () => {
  let service: LoginFacadeService;
  let authService: AuthService;
  let authStoreService: AuthStoreService;

  beforeEach(() => {
    TestBed.configureTestingModule({
        providers: [
          MockProviders(AuthService, AuthStoreService)
        ]
    });
    service = TestBed.inject(LoginFacadeService);
    authService = TestBed.inject(AuthService);
    authStoreService = TestBed.inject(AuthStoreService);
  });

  it('deve autenticar o usuário', fakeAsync(() => {
    const fakeEmail = 'correto@dominio.com';
    const fakePassword = '123456';

    let result: boolean | null = null;

    (authService.login as jest.Mock).mockReturnValue(of( {token: 'fake-jwt-token'} ));

    service.login('usuario', 'senha').subscribe(() => {
      result = true;
    });

    tick();

    expect(authService.login).toHaveBeenCalledWith(fakeEmail, fakePassword);

    expect(authStoreService.setAsLoggedIn).toHaveBeenCalled();
    
    expect(result).toBe(true);

  }));
});
