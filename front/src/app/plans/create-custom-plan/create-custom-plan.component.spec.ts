import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateCustomPlanComponent } from './create-custom-plan.component';

describe('CreateCustomPlanComponent', () => {
  let component: CreateCustomPlanComponent;
  let fixture: ComponentFixture<CreateCustomPlanComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateCustomPlanComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateCustomPlanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
