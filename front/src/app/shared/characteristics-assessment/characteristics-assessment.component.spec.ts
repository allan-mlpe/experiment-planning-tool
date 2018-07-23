import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CharacteristicsAssessmentComponent } from './characteristics-assessment.component';

describe('CharacteristicsAssessmentComponent', () => {
  let component: CharacteristicsAssessmentComponent;
  let fixture: ComponentFixture<CharacteristicsAssessmentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CharacteristicsAssessmentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CharacteristicsAssessmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
