import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InputFieldErrorComponent } from './input-field-error.component';

describe('InputFieldErrorComponent', () => {
  let component: InputFieldErrorComponent;
  let fixture: ComponentFixture<InputFieldErrorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InputFieldErrorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InputFieldErrorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
