import {Component, OnInit} from '@angular/core';
import {lineChartMulti} from '../ngxcharts';
import * as chartsData from '../ngxcharts.config';
import {ActivatedRoute} from '@angular/router';
// import {single, multi} from './data';

import {Transaction} from '../transaction.model';
import {TransactionService} from '../transaction.service';
import {Account} from '../account';

@Component({
  selector: 'app-ngx',
  templateUrl: './ngxcharts.component.html',
  styleUrls: ['./ngxcharts.component.css']
})
export class NgxChartsComponent implements OnInit {

  transaction: Transaction;
  userId: number;
  transactions: Transaction[];
  accounts: Account[];
  allTransactions: Transaction[] = []; // Current Page
  total = 0;
  selectedPage = 1;
  start = 0;
  limit = 10;
  end = this.limit;
  single = [];

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

  constructor(private transactionService: TransactionService,
              private route: ActivatedRoute) {
    // Object.assign(this, {single, multi});
  }

  // ngOnInit() {
  //   this.userId = +this.route.snapshot.paramMap.get('id');
  //   this.transactionService.getAccountByUserID(this.userId).subscribe(transaction => this.accounts = transaction);
  // this.transactionService.getTransactions()
  // .subscribe(transactions => {
  // this.total = transactions.length;
  // this.allTransactions = transactions;
  // this.transactions = this.allTransactions.slice(this.start, this.end);
  //
  //
  // this.sub = this._http.get().subscribe(
  //   amount => {
  //     this.amount = amount.json().amount;
  //     let currData;
  //     this.amount.map(a => {
  //       currData = new Date(a.transactionDt[0], a.transactionDt[1], a.transactionDt[2]);
  //       this.ngxData.data[0].series.push({
  //         name: currData.getTime().toString(),
  //         value: a.amount,
  //       });
  //       this.ngxData.data[1].series.push({
  //         name: currData.getTime().toString(),
  //         value: p.estimated,
  //       });
  //     });
  //     this.ngxData.data = [...this.ngxData.data];
  //   },
  //   err => {
  //     console.log(err);
  //   }
  // );
  // }

  ngOnInit() {
    this.userId = +this.route.snapshot.paramMap.get('id');
    this.transactionService.getAccountByUserID(this.userId).subscribe(transaction => this.accounts = transaction);
    this.transactionService.getTransactions()
      .subscribe(transaction => {
        console.log(transaction);
        this.single = transaction.map(datum => ({name: datum.transactionDt, value: datum.amount}));
      });
  }

  getTransactions(): void {
    this.transactionService.getTransactions()
      .subscribe(transactions => {
          this.total = transactions.length;
          this.allTransactions = transactions;
          this.transactions = this.allTransactions.slice(this.start, this.end);
        }
      );
  }

  onSelect(event) {
    console.log(event);
  }

  public pageChange(page): void {
    this.start = (this.selectedPage - 1) * this.limit;
    this.end = this.start + this.limit;
    this.transactions = this.allTransactions.slice(this.start, this.end);
  }
}
