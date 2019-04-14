import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { UserComponent } from './user/user.component';
// import { TransactionComponent } from './transaction/transaction.component';
// import { TransactionDetailComponent } from './transaction-detail/transaction-detail.component';
import { MessagesComponent } from './messages/messages.component';
import { UserSearchComponent } from './user-search/user-search.component';
import { UserDetailComponent } from './user-detail/user-detail.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AccountsComponent } from './accounts/accounts.component';

@NgModule({
  declarations: [
    AppComponent,
    UserComponent,
    // TransactionComponent,
    // TransactionDetailComponent,
    MessagesComponent,
    UserSearchComponent,
    UserDetailComponent,
    DashboardComponent,
    AccountsComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [],

  bootstrap: [AppComponent]
})
export class AppModule { }
