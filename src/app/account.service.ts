import { Injectable } from '@angular/core';
import {Observable, of} from 'rxjs';
import {catchError, tap} from 'rxjs/operators';
import {Account} from './account';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {MessageService} from './message.service';
// import { UserComponent} from './profile/profile.component';

const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
};
@Injectable({
  providedIn: 'root'
})
export class AccountService {
  private accountUrl = 'https://budgetapp-server.herokuapp.com/budget/account';
  // private accountUrl = 'http://localhost:8080/budget/account';
  // private userId;
  private log(message: string) {
    this.messageService.add(`AccountService: ${message}`);
  }
  constructor(private http: HttpClient, private messageService: MessageService) {
    // this.userId = userComponent.userId;
  }
  getAccounts(userId: number): Observable<Account[]> {
    const url = `${this.accountUrl}/?userId=${userId}`;
    return this.http.get<Account[]>(url)
      .pipe(
        tap(_ => this.log('Account Data')),
        catchError(this.handleError<Account[]>('getAccounts', []))
      );
  }
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);
      console.log(`${operation} failed: ${error.message}`);
      return of(result as T);
    };
  }
  addAccount(account: Account): Observable<Account> {
    return this.http.post<Account>(this.accountUrl, account, httpOptions).pipe(
      tap((newAccount: Account) => this.log(`added account w/ id=${newAccount.id}`)),
      catchError(this.handleError<Account>('addAccount')));
  }
}
