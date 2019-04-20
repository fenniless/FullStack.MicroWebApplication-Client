import {Component, Input, OnInit} from '@angular/core';
import { Account} from '../account';
import { AccountService} from '../account.service';
import { ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-accounts',
  templateUrl: './accounts.component.html',
  styleUrls: ['./accounts.component.css']
})
export class AccountsComponent implements OnInit {
  userId: number;
  accounts: Account[];
  selectedAccount: Account;
  createAccount: boolean;
  @Input() account: Account;
  constructor(private accountService: AccountService, private route: ActivatedRoute) {
  }
  ngOnInit() {
    this.userId = +this.route.snapshot.paramMap.get('id');
    this.getAccounts();
  }
  getAccounts(): void {
    this.accountService.getAccounts(this.userId).subscribe(account => this.accounts = account);
  }
  onSelect(account: Account): void {
    this.selectedAccount = account;
  }
  onClick(): void {
    if (!this.createAccount) {
      this.createAccount = true;
    } else {
      this.createAccount = false;
    }
  }
  add(name: string, balance: number, accountTypeId: number, userId: number): void {
    name = name.trim();
    accountTypeId = 1;
    userId = this.userId;
    if (!name) { return; }
    this.accountService.addAccount({ name, balance, accountTypeId, userId} as Account)
      .subscribe(account => {
        this.accounts.push(account);
      });
    this.createAccount = false;
  }
}
