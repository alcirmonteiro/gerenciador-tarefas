import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LogoutComponent } from './logout.component';
import { TestHelper } from '@testing/helpers/test-helper';
import { MockProvider } from 'ng-mocks';
import { AuthStoreService } from 'src/app/shared/stores/auth.store';
import { of } from 'rxjs';

describe('LogoutComponent', () => {
  let fixture: ComponentFixture<LogoutComponent>;
  let testHelper: TestHelper<LogoutComponent>;
  let authStoreService: AuthStoreService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      providers: [
        MockProvider(AuthStoreService)        
      ],
      imports: [LogoutComponent],
    }).compileComponents();

    authStoreService = TestBed.inject(AuthStoreService);
     
  });

  describe('Quando o usuário não estiver logado', () => {
    it('não deve renderizar o botão de logout', () => {
      (authStoreService.isLoggedIn$ as jest.Mock).mockReturnValue(of(false));

      fixture = TestBed.createComponent(LogoutComponent);
      testHelper = new TestHelper<LogoutComponent>(fixture);
      fixture.detectChanges();
      
      expect(testHelper.queryByTestId('header-logout')).toBeNull();
    });
  });  

});
