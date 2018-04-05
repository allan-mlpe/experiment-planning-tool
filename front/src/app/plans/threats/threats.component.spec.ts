import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ThreatsComponent } from './threats.component';

describe('ThreatsComponent', () => {
  let component: ThreatsComponent;
  let fixture: ComponentFixture<ThreatsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ThreatsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ThreatsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
