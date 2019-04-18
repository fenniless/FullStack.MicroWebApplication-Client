import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';

import {Transaction} from '../transaction';
import {Account} from '../account';
import {TransactionService} from '../transaction.service';

import {Transactiontype} from '../transactiontype';

const resetFromForm = 'Select account :';
const resetToForm = 'Select account :';
const transactionTypeForm = 'Select type :';

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
    this.transactionTypeName = transactionTypeForm;
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
  transactionTypes: Transactiontype[];
  selectedTransactionType: Transactiontype;
  transactionTypeName: string;
  transactionTypeId: number;

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

    this.transactionService.getTransactionTypes().subscribe(transactionType => this.transactionTypes = transactionType);
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

  onSelectTransactionType(transactionType: Transactiontype) {
    this.selectedTransactionType = transactionType;
    this.transactionTypeName = this.selectedTransactionType.description;
    this.transactionTypeId = this.selectedTransactionType.id;
  }

  // to do: Add rest of fields
  addDeposit(amount: number, memo: string, fromAccountId: number, toAccountId: number, transactionType: string): void {
    if (!amount) {
      return;
    }
    if (!this.validDeposit()) {
      return;
    }
    const transactionDt = new Date().toJSON();
    this.transactionService.addDepositTransaction({amount, memo, fromAccountId, toAccountId, transactionType, transactionDt} as Transaction)
      .subscribe(transaction => this.transaction = transaction);
    this.cancelTransaction();
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
    if ((document.getElementById('transactionType') as HTMLInputElement).hidden === false) {
      if (this.transactionTypeName === transactionTypeForm) {
        return false;
      }
    }
    return true;
  }

  enableTransfer(): void {
    this.clearFields();
    this.transactionService.getAccounts().subscribe(account => this.accountsTo = account);
    TransactionComponent.enableGeneralButtons();
    (document.getElementById('fromAccount') as HTMLInputElement).hidden = false;
    (document.getElementById('toAccount') as HTMLInputElement).hidden = false;
  }

  enableDeposit() {
    this.clearFields();
    this.transactionService.getAccountByUserID(this.userId).subscribe(account => this.accountsTo = account);
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
    this.transactionTypeName = transactionTypeForm;
    this.transactionTypeId = null;
  }
}
