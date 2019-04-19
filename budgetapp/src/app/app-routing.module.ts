import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {UserComponent} from './user/user.component';
import {AccountsComponent} from './accounts/accounts.component';
import {TransactionComponent} from './transaction/transaction.component';
import {UserDetailComponent} from './user-detail/user-detail.component';

const routes: Routes = [
  {path: 'profiles', component: UserComponent},
  {path: 'profile/:id', component: UserDetailComponent},
  {path: 'accounts', component: AccountsComponent},
 {path: 'transactions', component: TransactionComponent},
  {path: 'transaction/:id', component: TransactionComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
