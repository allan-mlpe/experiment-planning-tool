import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {CreateDraftComponent} from './create-draft.component';

describe('CreateDraftComponent', () => {
  let component: CreateDraftComponent;
  let fixture: ComponentFixture<CreateDraftComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateDraftComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateDraftComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
