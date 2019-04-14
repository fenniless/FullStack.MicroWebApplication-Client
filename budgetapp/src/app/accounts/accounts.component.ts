import { Component, OnInit } from '@angular/core';
import { Account} from '../account';

@Component({
  selector: 'app-accounts',
  templateUrl: './accounts.component.html',
  styleUrls: ['./accounts.component.css']
})
export class AccountsComponent implements OnInit {

  constructor() { }
  accounts: Account[];
  selectedAccount: Account;
  ngOnInit() {
  }

}
