import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReadyToReviewComponent } from './ready-to-review.component';

describe('ReadyToReviewComponent', () => {
  let component: ReadyToReviewComponent;
  let fixture: ComponentFixture<ReadyToReviewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReadyToReviewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReadyToReviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
