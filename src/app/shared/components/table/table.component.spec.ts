import { ComponentFixture, TestBed } from '@angular/core/testing';
import { first } from 'rxjs';
import { ButtonComponent } from '../button/button.component';
import { TableComponent } from './table.component';
import { TableAction } from './table.model';

describe('TableComponent', () => {
  let component: TableComponent<any>;
  let fixture: ComponentFixture<TableComponent<any>>;
  let buttonElement: ButtonComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TableComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(TableComponent);
    component = fixture.componentInstance;
    buttonElement = fixture.nativeElement.querySelector('app-button');

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('should get date', () => {
    const v = '2023-11-11';
    expect(component.getDate(v)).toEqual(new Date(v));
  });
  it('should emit the correct value when onClickAction is called', () => {
    let emittedValue: { action: TableAction; item: any } | undefined;

    component.clickAction
      .pipe(first())
      .subscribe((value) => (emittedValue = value));

    const mockAction: TableAction = {
      name: 'Editar',
      type: 'edit',
    };
    const mockItem: any = {
      id: 'test',
    };

    component.onClickAction(mockAction, mockItem);
    expect(emittedValue).toEqual({ action: mockAction, item: mockItem });
  });
});
