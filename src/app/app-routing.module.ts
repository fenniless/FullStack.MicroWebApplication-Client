import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {UserComponent} from './user/user.component';
import {AccountsComponent} from './accounts/accounts.component';
import {TransactionComponent} from './transaction/transaction.component';
import {TransactionListComponent} from './transaction-list/transaction-list.component';
import {NgxChartsComponent} from './ngxcharts/ngxcharts.component';
import {MainWindowComponent} from './main-window/main-window.component';

const routes: Routes = [
  {path: 'profiles', component: UserComponent},
  {path: 'accounts', component: AccountsComponent},
  {path: 'accounts/:id', component: AccountsComponent},
  {path: 'transaction/:id', component: TransactionComponent},
  {path: 'mainwindow/:id/transaction/:id', component: TransactionComponent},
  {path: 'mainwindow/:id', component: MainWindowComponent},
  {path: 'transactions', component: TransactionListComponent},
  {path: 'transactions:/id', component: TransactionListComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {onSameUrlNavigation: 'reload'})],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
