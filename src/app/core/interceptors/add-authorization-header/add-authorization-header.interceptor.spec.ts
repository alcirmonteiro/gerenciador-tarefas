import { TestBed } from '@angular/core/testing';
import { HttpClient, HttpInterceptorFn, provideHttpClient, withInterceptors } from '@angular/common/http';
import { addAuthorizationHeaderInterceptor } from './add-authorization-header.interceptor';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { MockProviders } from 'ng-mocks';
import { AuthStoreService } from 'src/app/shared/stores/auth.store';
import { AuthTokenManagerService } from 'src/app/shared/services/auth-token-manager/auth-token-manager.service';
import exp from 'constants';

describe('addAuthorizationHeaderInterceptor', () => {
  let authStoreService: AuthStoreService;
  let authttokenManagerService: AuthTokenManagerService;
  let httpClient: HttpClient;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        MockProviders(AuthStoreService, AuthTokenManagerService), 
        provideHttpClient(
          withInterceptors([addAuthorizationHeaderInterceptor]) 
        ),
        provideHttpClientTesting()
      ],
    });

    authStoreService = TestBed.inject(AuthStoreService);
    authttokenManagerService = TestBed.inject(AuthTokenManagerService);
    httpClient = TestBed.inject(HttpClient);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  describe('quando o usuário estiver logado', () => {
    it('deve adicionar um token "Authorization" ao cabeçalho da requisição', () => {
      const fakeAuthToken = 'fake-auth-token';

      (authStoreService.isLoggedIn as jest.Mock).mockReturnValue(true);
      
      (authttokenManagerService.getToken as jest.Mock).mockReturnValue(fakeAuthToken);

      httpClient.get('/fake').subscribe();

      const req = httpTestingController.expectOne('/fake');

      expect(req.request.headers.has('Authorization')).toBeTruthy();

      expect(req.request.headers.get('Authorization')).toBe(fakeAuthToken);
      
    });
  });  

  describe('quando o usuário não estiver logado', () => {
    it('não deve adicionar um token "Authorization" ao cabeçalho da requisição', () => {
      (authStoreService.isLoggedIn as jest.Mock).mockReturnValue(false);
      
      httpClient.get('/fake').subscribe();

      const req = httpTestingController.expectOne('/fake');

      expect(authttokenManagerService.getToken).not.toHaveBeenCalled();

      expect(req.request.headers.has('Authorization')).toBeFalsy();
    });
  });  
});
