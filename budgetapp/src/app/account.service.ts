import { Injectable } from '@angular/core';
import {Observable, of} from 'rxjs';
import {catchError, tap} from 'rxjs/operators';
import {Account} from './account';
import {HttpClient} from '@angular/common/http';
import {MessageService} from './message.service';
// import { UserComponent} from './profile/profile.component';

@Injectable({
  providedIn: 'root'
})
export class AccountService {
  private accountUrl = 'https://budgetapp-server.herokuapp.com/budget/account';
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
}
