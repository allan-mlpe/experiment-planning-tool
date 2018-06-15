import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReviewPlanComponent } from './review-plan.component';

describe('ReviewPlanComponent', () => {
  let component: ReviewPlanComponent;
  let fixture: ComponentFixture<ReviewPlanComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReviewPlanComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReviewPlanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
