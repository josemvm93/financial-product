import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BaseControlComponent } from './base-control.component';

describe('BaseControlComponent', () => {
  let component: BaseControlComponent;
  let fixture: ComponentFixture<BaseControlComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ BaseControlComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BaseControlComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
