import {Component} from '@angular/core';
import {lineChartMulti} from './data-viz-graph';
import * as chartsData from '../data-viz-graph.config';

@Component({
  selector: 'app-ngx',
  templateUrl: './data-viz-graph.component.html'
})
export class DataVizGraphComponent {

  lineChartMulti = lineChartMulti;
  // Line Charts

  lineChartView: any[] = chartsData.lineChartView;

  // options
  lineChartShowXAxis = chartsData.lineChartShowXAxis;
  lineChartShowYAxis = chartsData.lineChartShowYAxis;
  lineChartGradient = chartsData.lineChartGradient;
  lineChartShowLegend = chartsData.lineChartShowLegend;
  lineChartShowXAxisLabel = chartsData.lineChartShowXAxisLabel;
  lineChartXAxisLabel = chartsData.lineChartXAxisLabel;
  lineChartShowYAxisLabel = chartsData.lineChartShowYAxisLabel;
  lineChartYAxisLabel = chartsData.lineChartYAxisLabel;

  lineChartColorScheme = chartsData.lineChartColorScheme;

  // line, area
  lineChartAutoScale = chartsData.lineChartAutoScale;
  lineChartLineInterpolation = chartsData.lineChartLineInterpolation;

  constructor() {
    Object.assign(this, {lineChartMulti});
  }

  onSelect(event) {
    console.log(event);
  }

}
