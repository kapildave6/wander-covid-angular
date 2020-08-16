import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CovidSummaryComponent } from './covid-summary.component';

describe('CovidSummaryComponent', () => {
  let component: CovidSummaryComponent;
  let fixture: ComponentFixture<CovidSummaryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CovidSummaryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CovidSummaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
