import { Component, OnInit } from '@angular/core';

import {Transaction} from '../transaction';
import {TransactionService} from '../transaction.service';

@Component({
  selector: 'app-transaction',
  templateUrl: './transaction.component.html',
  styleUrls: ['./transaction.component.css']
})
export class TransactionComponent implements OnInit {
  transaction: Transaction;
  transactions: Transaction[];

  constructor(private transactionService: TransactionService) { }

  ngOnInit() {this.getTransactions();
  }

  getTransactions(): void {
  this.transactionService.getTransactions()
    .subscribe(transaction => this.transactions = transaction);
  }

  onSelect(singleTransaction: Transaction) {
    this.transaction = singleTransaction;
  }

  // to do: Add rest of fields
  addDeposit(amount: number, memo: string, fromAccountId: number,  toAccountId: number): void {
    if (!amount) {return; }
    this.transactionService.addDepositTransaction({amount, memo, fromAccountId, toAccountId} as Transaction)
      .subscribe( transaction => {
          this.transactions.push(transaction);
      });
    this.cancelTranscaction();
  }

  enableGeneralButtons(): void {
    (document.getElementById('addTransactionButton') as HTMLInputElement).hidden = false;
    (document.getElementById('amount') as HTMLInputElement).hidden = false;
    (document.getElementById('memo') as HTMLInputElement).hidden = false;
    (document.getElementById('cancelTransaction') as HTMLInputElement).hidden = false;
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

  cancelTranscaction() {
    (document.getElementById('addTransactionButton') as HTMLInputElement).hidden = true;
    (document.getElementById('amount') as HTMLInputElement).hidden = true;
    (document.getElementById('memo') as HTMLInputElement).hidden = true;
    (document.getElementById('fromAccount') as HTMLInputElement).hidden = true;
    (document.getElementById('toAccount') as HTMLInputElement).hidden = true;
    (document.getElementById('cancelTransaction') as HTMLInputElement).hidden = true;
  }
}
