import {Component, Input, OnInit} from '@angular/core';
import { Account} from '../account';
import { AccountService} from '../account.service';

@Component({
  selector: 'app-accounts',
  templateUrl: './accounts.component.html',
  styleUrls: ['./accounts.component.css']
})
export class AccountsComponent implements OnInit {
  accounts: Account[];
  selectedAccount: Account;
  @Input() account: Account;
  constructor(private accountService: AccountService) {
  }
  ngOnInit() {
    this.getAccounts();
  }
  getAccounts(): void {
    this.accountService.getAccounts().subscribe(account => this.accounts = account);
  }
  onSelect(account: Account): void {
    this.selectedAccount = account;
  }
}
