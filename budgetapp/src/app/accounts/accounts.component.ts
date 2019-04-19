import {Component, Input, OnInit} from '@angular/core';
import { Account} from '../account';
import { AccountService} from '../account.service';

@Component({
  selector: 'app-accounts',
  templateUrl: './accounts.component.html',
  styleUrls: ['./accounts.component.css']
})
export class AccountsComponent implements OnInit {
  userId: number;
  accounts: Account[];
  selectedAccount: Account;
  @Input() account: Account;
  constructor(private accountService: AccountService) {
    // this.userId = 4;
  }
  ngOnInit() {
    this.getAccounts();
  }
  getAccounts(): void {
    this.accountService.getAccounts(this.userId).subscribe(account => this.accounts = account);
  }
  onSelect(account: Account): void {
    this.selectedAccount = account;
  }
  add(name: string, balance: number): void {
    name = name.trim();
    if (!name) { return; }
    this.accountService.addAccount({ name, balance} as Account)
      .subscribe(account => {
        this.accounts.push(account);
      });
  }
}
