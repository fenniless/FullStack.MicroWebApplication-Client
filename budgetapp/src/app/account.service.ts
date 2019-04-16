import { Injectable } from '@angular/core';
import {Observable, of} from 'rxjs';
import {catchError, tap} from 'rxjs/operators';
import {Account} from './account';
import {HttpClient} from '@angular/common/http';
import {MessageService} from './message.service';

@Injectable({
  providedIn: 'root'
})
export class AccountService {
  private accountUrl = 'http://localhost:8080/budget/account';
  private log(message: string) {
    this.messageService.add(`AccountService: ${message}`);
  }
  constructor(private http: HttpClient, private messageService: MessageService) {
  }
  getAccounts(): Observable<Account[]> {
    return this.http.get<Account[]>(this.accountUrl)
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
