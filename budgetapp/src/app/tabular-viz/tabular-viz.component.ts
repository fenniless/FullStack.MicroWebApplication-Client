import {Component, OnInit} from '@angular/core';
import {Transaction} from '../transaction';
import {TransactionService} from '../transaction.service';

@Component({
  selector: 'app-tabular-viz',
  templateUrl: './tabular-viz.component.html',
  styleUrls: ['./tabular-viz.component.css']
})
export class TabularVizComponent implements OnInit {
  transaction: Transaction;
  transactions: Transaction[];

  // constructor() {
  // }

  constructor(private transactionService: TransactionService) {
  }

  public columns = [
    {
      prop: 'transactionId', // prop will bind to the json property
      name: 'Transaction ID' // You can define the name here
      // ( Column label. If none specified, it will use the prop value and decamelize it. )
    },
    {
      prop: 'fromAccountId',
      name: 'From'
    },
    {
      prop: 'toAccountId',
      name: 'To'
    },
    {
      prop: 'memo',
      name: 'Memo'
    },
    {
      prop: 'amount',
      name: 'Amount'
    },
    {
      series: [
        {
          description: 'Rent',
          id: 1
        }]
    },
    {
      prop: 'transactionDt',
      name: 'Date'
    }
  ];

  view: any[] = [800, 400];

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
