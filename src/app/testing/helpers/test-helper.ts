import { ComponentFixture } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

export class TestHelper<T> {
  constructor(private fixture: ComponentFixture<T>) { }

  queryByTestId(testId: string) {
    return this.fixture.debugElement.query(By.css(`[data-testid="${testId}"]`));
  } 

  getTextContentByTestId(testId: string): string {
    const debugEl = this.queryByTestId(testId);
    return debugEl ? debugEl.nativeElement.textContent : '';
  }

  getInputValue(testId: string): string {
    const debugEl = this.queryByTestId(testId);
    return debugEl ? debugEl.nativeElement.value : '';
  }

  isCheckBoxChecked(testId: string): boolean {
    const debugEl = this.queryByTestId(testId);
    return debugEl ? debugEl.nativeElement.checked : false;
  }

  triggerInputEvent(testId: string, value: string) {
    this.queryByTestId(testId).triggerEventHandler('input', { target: { value } });
  }

  changeCheckBoxValue(testId: string, value: boolean) {
    this.queryByTestId(testId).triggerEventHandler('change', { target: { checked: value } });
  }

  submitForm(testId: string) {
    this.queryByTestId(testId).triggerEventHandler('submit', null);
  }

  click(testId: string){
    this.queryByTestId(testId).nativeElement.click();
  }
}