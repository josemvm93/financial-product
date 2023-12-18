import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormGroupDirective } from '@angular/forms';
import { BaseControlDirective } from '@shared/directives/base-control.directive';
import { InputComponent } from './input.component';

describe('InputTextComponent', () => {
  let component: InputComponent;
  let fixture: ComponentFixture<InputComponent>;
  let inputElement: HTMLInputElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InputComponent, BaseControlDirective],
      providers: [FormGroupDirective],
    }).compileComponents();

    fixture = TestBed.createComponent(InputComponent);
    component = fixture.componentInstance;
    inputElement = fixture.nativeElement.querySelector('input');

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should emit onBlur value', () => {
    spyOn(component, 'onInputBlur').and.callThrough();
    inputElement.dispatchEvent(new Event('blur'));
    expect(component.onInputBlur).toHaveBeenCalled();
  });
});
