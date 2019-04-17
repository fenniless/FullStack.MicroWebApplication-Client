import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';

import {Transaction} from '../transaction';
import {Account} from '../account';
import {TransactionService} from '../transaction.service';

import {Profile} from '../user';

@Component({
  selector: 'app-transaction',
  templateUrl: './transaction.component.html',
  styleUrls: ['./transaction.component.css']
})
export class TransactionComponent implements OnInit {
  transaction: Transaction;
  userId: number;
  transactions: Transaction[];
  accounts: Account[];
  selectFromAccount: Account;
  fromAccount: string;
  fromAccountId: number;

  constructor(private transactionService: TransactionService,
              private route: ActivatedRoute) {
    this.fromAccount = 'Select account';
  }

  ngOnInit() {
    this.userId = +this.route.snapshot.paramMap.get('id');
    this.transactionService.getAccountByUserID(this.userId).subscribe(transaction => this.accounts = transaction);
  }

  getTransactions(): void {
    this.transactionService.getTransactions()
      .subscribe(transaction => this.transactions = transaction);
  }

  onSelectFromAccount(account: Account) {
    this.selectFromAccount = account;
    this.fromAccount = this.selectFromAccount.name;
    this.fromAccountId = this.selectFromAccount.id;
  }

  // to do: Add rest of fields
  addDeposit(amount: number, memo: string, fromAccountId: number, toAccountId: number, transactionType: string): void {
    if (!amount) {
      return;
    }
    this.transactionService.addDepositTransaction({amount, memo, fromAccountId, toAccountId, transactionType} as Transaction)
      .subscribe(transaction => {
        this.transactions.push(transaction);
      });
    // this.transactionService.addDepositTransaction({amount, memo, fromAccountId, toAccountId, transactionType} as Transaction);
    this.cancelTransaction();
  }

  enableGeneralButtons(): void {
    (document.getElementById('addTransactionButton') as HTMLInputElement).hidden = false;
    (document.getElementById('amount') as HTMLInputElement).hidden = false;
    (document.getElementById('memo') as HTMLInputElement).hidden = false;
    (document.getElementById('cancelTransaction') as HTMLInputElement).hidden = false;
    (document.getElementById('transactionType') as HTMLInputElement).hidden = false;
  }

  enableTransfer(): void {
    this.enableGeneralButtons();
    (document.getElementById('fromAccount') as HTMLInputElement).hidden = false;
    (document.getElementById('toAccount') as HTMLInputElement).hidden = false;
  }

  enableDeposit() {
    this.enableGeneralButtons();
    (document.getElementById('toAccount') as HTMLInputElement).hidden = false;
    (document.getElementById('fromAccount') as HTMLInputElement).hidden = true;
  }

  enableWithDraw() {
    this.enableGeneralButtons();
    (document.getElementById('fromAccount') as HTMLInputElement).hidden = false;
    (document.getElementById('toAccount') as HTMLInputElement).hidden = true;
  }

  cancelTransaction() {
    (document.getElementById('addTransactionButton') as HTMLInputElement).hidden = true;
    (document.getElementById('amount') as HTMLInputElement).hidden = true;
    (document.getElementById('memo') as HTMLInputElement).hidden = true;
    (document.getElementById('fromAccount') as HTMLInputElement).hidden = true;
    (document.getElementById('toAccount') as HTMLInputElement).hidden = true;
    (document.getElementById('cancelTransaction') as HTMLInputElement).hidden = true;
    (document.getElementById('transactionType') as HTMLInputElement).hidden = true;
  }
}
