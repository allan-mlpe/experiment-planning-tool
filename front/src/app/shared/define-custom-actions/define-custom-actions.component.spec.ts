import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {DefineCustomActionsComponent} from './define-custom-actions.component';

describe('DefineCustomActionsComponent', () => {
  let component: DefineCustomActionsComponent;
  let fixture: ComponentFixture<DefineCustomActionsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DefineCustomActionsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DefineCustomActionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
