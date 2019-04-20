import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {UserComponent} from './user/user.component';
import {AccountsComponent} from './accounts/accounts.component';
import {TransactionComponent} from './transaction/transaction.component';
import {TransactionListComponent} from './transaction-list/transaction-list.component';
import {DashboardComponent} from './dashboard/dashboard.component';

const routes: Routes = [
  {path: 'profiles', component: UserComponent},
  {path: 'accounts', component: AccountsComponent},
  {path: 'accounts/:id', component: AccountsComponent},
  {path: 'transaction/:id', component: TransactionComponent},
  {path: 'transactions', component: TransactionListComponent},
  {path: 'dashboard', component: DashboardComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
