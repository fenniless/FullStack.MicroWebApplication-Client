import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DataVizGraphComponent } from './data-viz-graph.component';

describe('DataVizGraphComponent', () => {
  let component: DataVizGraphComponent;
  let fixture: ComponentFixture<DataVizGraphComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DataVizGraphComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DataVizGraphComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
