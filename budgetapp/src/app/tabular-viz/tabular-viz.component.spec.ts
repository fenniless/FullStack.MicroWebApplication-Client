import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {TabularVizComponent} from './tabular-viz.component';

describe('TabularVizComponent', () => {
  let component: TabularVizComponent;
  let fixture: ComponentFixture<TabularVizComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [TabularVizComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TabularVizComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
