import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {ThreatClassificationComponent} from './threat-classification.component';

describe('ThreatClassificationComponent', () => {
  let component: ThreatClassificationComponent;
  let fixture: ComponentFixture<ThreatClassificationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ThreatClassificationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ThreatClassificationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
