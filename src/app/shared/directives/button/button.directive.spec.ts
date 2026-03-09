import { TestBed } from '@angular/core/testing';
import { ButtonDirective, ButtonXsDirective } from './button.directive';
import { Component, Type } from '@angular/core';
import { TestHelper } from '@testing/helpers/test-helper';
import exp from 'constants';


function createComponent(template: string, directive: Type<unknown>) {
  @Component({
      standalone: true,
      imports: [directive],
      template
    })
    class HostComponent {}
    
    const fixture = TestBed.createComponent(HostComponent);
    const testHelper = new TestHelper(fixture);
    
    fixture.detectChanges();

    return { fixture, testHelper };
}

describe('Testes de Diretivas de Botão', () => {
  describe('ButtonDirective', () => {
    function createComponentWithButtonDirective(template: string) {
      return createComponent(template, ButtonDirective);
    }

    it('deve aplicar as classes css corretamente', () => {

      const { testHelper } = createComponentWithButtonDirective(`
          <button appButton="primary" data-testid="primary">Test Button</button>
          <button appButton="secondary" data-testid="secondary">Test Button</button>
          <button appButton="accent" data-testid="accent">Test Button</button>
          <button appButton="ghost" data-testid="ghost">Test Button</button>
          <button appButton="link" data-testid="link">Test Button</button>
          <button appButton="neutral" data-testid="neutral">Test Button</button>
        `);

      expect(testHelper.queryByTestId('primary').nativeElement.className).toBe('btn btn-primary');
      expect(testHelper.queryByTestId('secondary').nativeElement.className).toBe('btn btn-secondary');
      expect(testHelper.queryByTestId('accent').nativeElement.className).toBe('btn btn-accent');
      expect(testHelper.queryByTestId('ghost').nativeElement.className).toBe('btn btn-ghost');
      expect(testHelper.queryByTestId('link').nativeElement.className).toBe('btn btn-link');
      expect(testHelper.queryByTestId('neutral').nativeElement.className).toBe('btn btn-neutral');
    });

    it('deve aplicar apenas a classe btn quando a cor for inválida', () => {
      const { testHelper } = createComponentWithButtonDirective(`
          <button appButton="wrong-class" data-testid="wrong-class">Test Button</button>
        `);

      expect(testHelper.queryByTestId('wrong-class').nativeElement.className).toBe('btn');
    });  
  });

  describe('ButtonXsDirective', () => {
    function createComponentWithButtonXsDirective(template: string) {
      return createComponent(template, ButtonXsDirective);
    }


    it('deve adicionar a classe "btn-xs" e as outras classes de cores corretamente', () => {
      const { testHelper } = createComponentWithButtonXsDirective(`
        <button appButtonXs="primary" data-testid="primary">Test Button</button>
        <button appButtonXs="secondary" data-testid="secondary">Test Button</button>
        <button appButtonXs="accent" data-testid="accent">Test Button</button>  
        <button appButtonXs="ghost" data-testid="ghost">Test Button</button>
        <button appButtonXs="link" data-testid="link">Test Button</button>
        <button appButtonXs="neutral" data-testid="neutral">Test Button</button>
      `);

      expect(testHelper.queryByTestId('primary').nativeElement.className).toBe('btn btn-xs btn-primary');
      expect(testHelper.queryByTestId('secondary').nativeElement.className).toBe('btn btn-xs btn-secondary');
      expect(testHelper.queryByTestId('accent').nativeElement.className).toBe('btn btn-xs btn-accent');
      expect(testHelper.queryByTestId('ghost').nativeElement.className).toBe('btn btn-xs btn-ghost');
      expect(testHelper.queryByTestId('link').nativeElement.className).toBe('btn btn-xs btn-link');
      expect(testHelper.queryByTestId('neutral').nativeElement.className).toBe('btn btn-xs btn-neutral');
    });

    it('deve aplicar apenas a classe "btn" e "btn-xs" quando a cor for inválida', () => {
      const { testHelper } = createComponentWithButtonXsDirective(`
          <button appButtonXs="wrong-class" data-testid="wrong-class">Test Button</button>
        `);

      expect(testHelper.queryByTestId('wrong-class').nativeElement.className).toBe('btn btn-xs');
    }); 

  });
});