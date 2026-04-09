import { fakeAsync, TestBed, tick } from '@angular/core/testing';

import { AuthStoreService } from './auth.store';

describe('AuthService', () => {
  let authStoreService: AuthStoreService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    authStoreService = TestBed.inject(AuthStoreService);
  });

  it('deve retornar o valor "false" quando o usuário não estiver autenticado', () => {
    expect(authStoreService.isLoggedIn()).toBe(false);
  });

  it('deve retornar o valor "true" quando o usuário estiver autenticado', () => {
    authStoreService.setAsLoggedIn();
    expect(authStoreService.isLoggedIn()).toBe(true);
  });

  it('deve emitir um evento quando o usuário logar e deslogar', fakeAsync(() => {
    let result: boolean | null = null;

    authStoreService.isLoggedIn$().subscribe(value => {
      result = value;
    });

    tick();

    expect(result).toBe(false);

    authStoreService.setAsLoggedIn();

    tick();

    expect(result).toBe(true);

    authStoreService.setAsLoggedOut();

    tick();

    expect(result).toBe(false);
  }));   
});
