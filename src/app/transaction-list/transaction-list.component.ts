import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';

import {Transaction} from '../transaction.model';
import {TransactionService} from '../transaction.service';
import {Account} from '../account';
// import {Profile} from '../user';

@Component({
  selector: 'app-transaction-list',
  templateUrl: './transaction-list.component.html',
  styleUrls: ['./transaction-list.component.css']
})
export class TransactionListComponent implements OnInit {

  // private baseURI = 'https://budgetapp-server.herokuapp.com/budget/';
  // private transactionUrl = `${this.baseURI}transaction/`;
  // private accountUrl = `${this.baseURI}account`;

  constructor(private transactionService: TransactionService,
              private route: ActivatedRoute) {
  }

  // Pagination Fields
  loading = false;
  allTransactions: Transaction[] = []; // Current Page
  total = 0;
  selectedPage = 1;
  start = 0;
  limit = 10;
  end = this.limit;

  transaction: Transaction;
  userId: number;
  transactions: Transaction[];
  accounts: Account[];

  ngOnInit() {
    this.userId = +this.route.snapshot.paramMap.get('id');
    this.transactionService.getAccountByUserID(this.userId).subscribe(transaction => this.accounts = transaction);
    this.getLatestTransactions();
  }

  getLatestTransactions(): void {
    this.loading = true;
    this.transactionService.getLatestTransactions()
      .subscribe(transactions => {
          this.total = transactions.length;
          this.allTransactions = transactions;
          this.transactions = this.allTransactions.slice(this.start, this.end);
          this.loading = false;
        }
      );
  }

  // Pagination Logic
  public pageChange(): void {
    this.start = (this.selectedPage - 1) * this.limit;
    this.end = this.start + this.limit;
    this.transactions = this.allTransactions.slice(this.start, this.end);
  }
}
