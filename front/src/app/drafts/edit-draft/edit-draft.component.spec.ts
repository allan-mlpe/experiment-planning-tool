import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {EditDraftComponent} from './edit-draft.component';

describe('EditDraftComponent', () => {
  let component: EditDraftComponent;
  let fixture: ComponentFixture<EditDraftComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditDraftComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditDraftComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
