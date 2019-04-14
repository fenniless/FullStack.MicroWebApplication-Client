import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {UserComponent} from './user/user.component';
import {AccountsComponent} from './accounts/accounts.component';
import {TransactionComponent} from './transaction/transaction.component';

const routes: Routes = [
  {path: 'users', component: UserComponent},
  {path: 'accounts', component: AccountsComponent},
  {path: 'transactions', component: TransactionComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
