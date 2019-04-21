import {Component, Input, OnInit} from '@angular/core';
import {Account} from '../account';
import {AccountService} from '../account.service';
import {ActivatedRoute} from '@angular/router';
import {Accounttype} from "../accounttype";

@Component({
    selector: 'app-accounts',
    templateUrl: './accounts.component.html',
    styleUrls: ['./accounts.component.css']
})
export class AccountsComponent implements OnInit {
    @Input('userId') userId: number;
    accounts: Account[];
    selectedAccount: Account;
    createAccount: boolean;
    account: Account;
    accountTypes: Accounttype[];
    selectedAccountType: Accounttype;
    accountTypeName: string;
    accountTypeId: number;

    constructor(private accountService: AccountService, private route: ActivatedRoute) {
      this.createAccount = false;
    }

    ngOnInit() {
        //this.userId = +this.route.snapshot.paramMap.get('id');
        this.getAccounts();
        this.accountTypeName = "Type";
        this.accountService.getAccountTypes().subscribe(accountType => this.accountTypes = accountType);
    }

    getAccounts(): void {
        this.accountService.getAccounts(this.userId).subscribe(accounts => this.accounts = accounts);
    }

    onSelect(account: Account): void {
        this.selectedAccount = account;
    }

    onClick(): void {
      this.createAccount = !this.createAccount;
    }

    add(name: string, balance: number, accountTypeId: number, userId: number): void {
        name = name.trim();

        if (!this.validDeposit(name, balance)) {
            return;
        }
        accountTypeId = this.accountTypeId;
        userId = this.userId;
        this.accountService.addAccount({name, balance, accountTypeId, userId} as Account)
            .subscribe(
                account => {this.accounts.push(account);}
            );
        this.createAccount = false;
    }


    onSelectAccountType(accountType: Accounttype) {
        this.selectedAccountType = accountType;
        this.accountTypeName = this.selectedAccountType.description;
        this.accountTypeId = this.selectedAccountType.id;
    }

    private validDeposit(name: string, balance: number) {
        if (!name) {
            return false;
        }
        if (!balance) {
            return false;
        }
        if (!this.userId) {
            return false;
        }
        if (!this.accountTypeId) {
            return false;
        }
        return true;
    }
}
