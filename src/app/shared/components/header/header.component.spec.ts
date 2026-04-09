import { MockComponent } from 'ng-mocks';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HeaderComponent } from './header.component';
import { By } from '@angular/platform-browser';
import { LogoutComponent } from './logout/logout.component';

describe('HeaderComponent', () => {
  let fixture: ComponentFixture<HeaderComponent>;
 
  beforeEach(async () => {
    TestBed.configureTestingModule({
      imports: [HeaderComponent],
    });

    await TestBed.compileComponents();

    TestBed.overrideComponent(HeaderComponent, {
      remove: {
        imports: [(LogoutComponent)]
      },
      add: {
        imports: [MockComponent(LogoutComponent)]  
       }
    });

    fixture = TestBed.createComponent(HeaderComponent);
    fixture.detectChanges();
  });

  it('deve renderizar o título corretamente', () => {
    const h1Debugel = fixture.debugElement.query(By.css('h1'));
    expect(h1Debugel.nativeElement.textContent).toContain('Gerenciador de Tarefas');
  });
    
  it('deve renderizar o componente de logout', () => {
    const logoutDebugEl = fixture.debugElement.query(By.css('app-logout'));
    expect(logoutDebugEl).toBeTruthy();
  });

});
