import {Component, OnInit} from '@angular/core';
import {Transaction} from '../transaction';
import {TransactionService} from '../transaction.service';

@Component({
  selector: 'app-tabular-viz',
  templateUrl: './tabular-viz.component.html',
  styleUrls: ['./tabular-viz.component.css']
})
export class TabularVizComponent implements OnInit {
  title = 'Transactions Table';
  transaction: Transaction;
  transactions: Transaction[];

  // constructor() {
  // }

  constructor(private transactionService: TransactionService) {
  }

  // arrTransactions: string [];

  public columns = [
    {
      prop: 'amount',
      name: 'Amount'
    },
    {
      prop: 'transactionDt',
      name: 'Date'
    }
  ];

  // view: any[] = [800, 400];

  // options for the chart
  showXAxis = true;
  showYAxis = true;
  gradient = false;
  showLegend = true;
  showXAxisLabel = true;
  xAxisLabel = 'Date';
  showYAxisLabel = true;
  yAxisLabel = 'Amount';
  timeline = true;

  colorScheme = {
    domain: ['#5AA454', '#A10A28', '#C7B42C', '#AAAAAA']
  };

  // line, area
  autoScale = true;

  // pie
  showLabels = true;
  explodeSlices = false;
  doughnut = false;

  ngOnInit() {
    // this.getLatestTransactionsByPage();
  }

  // getTransactions(): void {
  //   this.transactionService.getTransactions()
  //     .subscribe(transaction => this.transactions = transaction);
  // }

  // getLatestTransactionsByPage(): void {
  //   this.transactionService.getLatestTransactionsByPage()
  //     .subscribe(transaction => {
  //       this.transactions.push(transaction);
  //     });
  // }
}
