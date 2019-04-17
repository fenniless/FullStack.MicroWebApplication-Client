import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';

import {Transaction} from '../transaction';
import {Account} from '../account';
import {TransactionService} from '../transaction.service';

import {Profile} from '../user';
import {from} from 'rxjs';
const resetFromForm = 'Select account';
const resetToForm = 'Select account';

@Component({
  selector: 'app-transaction',
  templateUrl: './transaction.component.html',
  styleUrls: ['./transaction.component.css']
})
export class TransactionComponent implements OnInit {


  constructor(private transactionService: TransactionService,
              private route: ActivatedRoute) {
    this.fromAccountName = resetFromForm;
    this.toAccountName = resetToForm;
  }

  transaction: Transaction;
  userId: number;
  transactions: Transaction[];
  accounts: Account[];
  accountsTo: Account[];
  selectFromAccount: Account;
  fromAccountName: string;
  fromAccountId: number;
  selectToAccount: Account;
  toAccountName: string;
  toAccountId: number;

  static enableGeneralButtons(): void {
    (document.getElementById('addTransactionButton') as HTMLInputElement).hidden = false;
    (document.getElementById('amount') as HTMLInputElement).hidden = false;
    (document.getElementById('memo') as HTMLInputElement).hidden = false;
    (document.getElementById('cancelTransaction') as HTMLInputElement).hidden = false;
    (document.getElementById('transactionType') as HTMLInputElement).hidden = false;
  }

  ngOnInit() {
    this.userId = +this.route.snapshot.paramMap.get('id');
    this.transactionService.getAccountByUserID(this.userId).subscribe(transaction => this.accounts = transaction);
    this.transactionService.getAccountByUserID(this.userId).subscribe(transaction => this.accountsTo = transaction);
  }

  getTransactions(): void {
    this.transactionService.getTransactions()
      .subscribe(transaction => this.transactions = transaction);
  }

  onSelectFromAccount(account: Account) {
    this.selectFromAccount = account;
    this.fromAccountName = this.selectFromAccount.name;
    this.fromAccountId = this.selectFromAccount.id;
  }

  onSelectToAccount(account: Account) {
    this.selectToAccount = account;
    this.toAccountName = this.selectToAccount.name;
    this.toAccountId = this.selectToAccount.id;
  }

  // to do: Add rest of fields
  addDeposit(amount: number, memo: string, fromAccountId: number, toAccountId: number, transactionType: string): void {
    if (!amount) {
      return;
    }
    if (this.validDeposit()) {
      this.transactionService.addDepositTransaction({amount, memo, fromAccountId, toAccountId, transactionType} as Transaction)
        .subscribe(transaction => this.transaction = transaction);

      this.cancelTransaction();
    }
  }

  validDeposit(): boolean {
    if ((document.getElementById('fromAccount') as HTMLInputElement).hidden === false) {
      if (this.fromAccountName === resetFromForm) {
        return false;
      }
    }
    if ((document.getElementById('toAccount') as HTMLInputElement).hidden === false) {
      if (this.toAccountName === resetToForm) {
        return false;
      }
    }
    return true;
  }

  enableTransfer(): void {
    this.clearFields();
    this.transactionService.getAccounts().subscribe(transaction => this.accountsTo = transaction);
    TransactionComponent.enableGeneralButtons();
    (document.getElementById('fromAccount') as HTMLInputElement).hidden = false;
    (document.getElementById('toAccount') as HTMLInputElement).hidden = false;
  }

  enableDeposit() {
    this.clearFields();
    TransactionComponent.enableGeneralButtons();
    (document.getElementById('toAccount') as HTMLInputElement).hidden = false;
    (document.getElementById('fromAccount') as HTMLInputElement).hidden = true;
  }

  enableWithDraw() {
    this.clearFields();
    TransactionComponent.enableGeneralButtons();
    (document.getElementById('fromAccount') as HTMLInputElement).hidden = false;
    (document.getElementById('toAccount') as HTMLInputElement).hidden = true;
  }

  cancelTransaction() {
    this.clearFields();
    (document.getElementById('addTransactionButton') as HTMLInputElement).hidden = true;
    (document.getElementById('amount') as HTMLInputElement).hidden = true;
    (document.getElementById('memo') as HTMLInputElement).hidden = true;
    (document.getElementById('fromAccount') as HTMLInputElement).hidden = true;
    (document.getElementById('toAccount') as HTMLInputElement).hidden = true;
    (document.getElementById('cancelTransaction') as HTMLInputElement).hidden = true;
    (document.getElementById('transactionType') as HTMLInputElement).hidden = true;
  }

  private clearFields() {
    this.fromAccountName = resetFromForm;
    this.fromAccountId = null;
    this.toAccountName = resetToForm;
    this.toAccountId = null;
  }
}
