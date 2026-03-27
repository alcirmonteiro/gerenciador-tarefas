import { TestBed } from '@angular/core/testing';

import { AuthStoreService } from './auth.store';

describe('AuthService', () => {
  let service: AuthStoreService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AuthStoreService);
  });

  it('deve retornar o valor "false" quando o usuário não estiver autenticado', () => {
    expect(service.isLoggedIn()).toBe(false);
  });

  it('deve retornar o valor "true" quando o usuário estiver autenticado', () => {
    service.setAsLoggedIn();
    expect(service.isLoggedIn()).toBe(true);
  });
});
