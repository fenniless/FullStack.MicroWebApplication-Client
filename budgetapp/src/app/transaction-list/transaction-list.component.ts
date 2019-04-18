import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {HttpClient} from '@angular/common/http';

import {Transaction} from '../transaction.model';
import {TransactionService} from '../transaction.service';
import {Account} from '../account';

// import {Profile} from '../user';
import {Transactiontype} from '../transactiontype';

@Component({
  selector: 'app-transaction-list',
  templateUrl: './transaction-list.component.html',
  styleUrls: ['./transaction-list.component.css']
})
export class TransactionListComponent implements OnInit {

  // private baseURI = 'https://budgetapp-server.herokuapp.com/budget/';
  private baseURI = 'http://localhost:8080/budget/';
  private transactionUrl = `${this.baseURI}transaction/`;
  private accountUrl = `${this.baseURI}account`;
  private transactionTypeURL = `${this.baseURI}transactiontype`;

  //public tl: TransactionList[];

  constructor(private transactionService: TransactionService,
              private route: ActivatedRoute, http: HttpClient) {
    http.get(this.transactionUrl).subscribe(result => {
      console.log(result);
      //     this.tl = result as TransactionList[];
    }, error => console.error(error));
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
  // TransactionList = Transaction[];
  userId: number;
  transactions: Transaction[];
  accounts: Account[];
  fromAccountId: number;
  toAccountId: number;

  ngOnInit() {
    this.userId = +this.route.snapshot.paramMap.get('id');
    this.transactionService.getAccountByUserID(this.userId).subscribe(transaction => this.accounts = transaction);
    this.getTransactions();
  }

  getTransactions(): void {
    this.loading = true;
    this.transactionService.getTransactions()
      .subscribe(transactions => {
          this.total = transactions.length;
          this.allTransactions = transactions;
          this.transactions = this.allTransactions.slice(this.start, this.end);
          this.loading = false;
        }
      );
  }

  // Pagination Clicks
  public pageChange(page): void {
    this.start = (this.selectedPage - 1) * this.limit;
    this.end = this.start + this.limit;
    this.transactions = this.allTransactions.slice(this.start, this.end);
  }
}

export interface TransactionsList {
  transactionId: Transaction;
  userId: number;
  accounts: Account[];
  accountsTo: Account[];
  // fromAccountName: string;
  fromAccountId: number;
  // toAccountName: string;
  toAccountId: number;
  transactionTypes: Transactiontype[];
  // transactionTypeName: string;
  // transactionTypeId: number;
}

