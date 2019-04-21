import * as shape from 'd3-shape';

// Line Charts

export let lineChartView: any[] = [550, 400];

// options
export let lineChartShowXAxis = true;
export let lineChartShowYAxis = true;
export let lineChartGradient = false;
export let lineChartShowLegend = false;
export let lineChartShowXAxisLabel = true;
export let lineChartXAxisLabel = 'Date';
export let lineChartShowYAxisLabel = true;
export let lineChartYAxisLabel = 'Amount';

export let lineChartColorScheme = {
  domain: ['#1CBCD8', '#FF8D60', '#FF586B', '#AAAAAA']
};

// line, area
export let lineChartAutoScale = true;
export let lineChartLineInterpolation = shape.curveBasis;
