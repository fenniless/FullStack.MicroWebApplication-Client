import {Component, Input, OnInit} from '@angular/core';
import { Account} from '../account';
import { AccountService} from '../account.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-accounts',
  templateUrl: './accounts.component.html',
  styleUrls: ['./accounts.component.css']
})
export class AccountsComponent implements OnInit {
  userId: number;
  accounts: Account[];
  selectedAccount: Account;
  private route: ActivatedRoute;

  @Input() account: Account;
  constructor(private accountService: AccountService) {
    this.userId = 4;
  }
  ngOnInit() {
    this.getAccounts();
  }
  getAccounts(): void {
    const id = +this.route.snapshot.paramMap.get('id');
    this.accountService.getAccounts(id)
      .subscribe(account => this.accounts = account);
  }
  onSelect(account: Account): void {
    this.selectedAccount = account;
  }
}
