import {Injectable} from '@angular/core';

import {HttpClient, HttpHeaders} from '@angular/common/http';

import {Observable, of} from 'rxjs';
import {catchError, map, tap} from 'rxjs/operators';

import {Transaction} from './transaction';
import {Account} from './account';
import {Transactiontype} from './transactiontype';
import {MessageService} from './message.service';

const httpOptions = {
  headers: new HttpHeaders({'Content-Type': 'application/json'})
};

@Injectable({
  providedIn: 'root'
})
export class TransactionService {


  constructor(private http: HttpClient,
              private messageService: MessageService) {
  }

  private baseURI = 'https://budgetapp-server.herokuapp.com/budget/';
  // private baseURI = 'http://localhost:8080/budget/';
  private transactionUrl = `${this.baseURI}transaction/`;
  private accountUrl = `${this.baseURI}account`;
  private transactionTypeURL = `${this.baseURI}transactiontype`;
  private latestTransactionURL = `${this.transactionUrl}latest`;

  private log(message: string) {
    this.messageService.add(`HeroService: ${message}`);
  }

  getTransactions(): Observable<Transaction[]> {
    return this.http.get<Transaction[]>(this.transactionUrl)
      .pipe(
        tap(_ => this.log('Transaction Data')),
        catchError(this.handleError<Transaction[]>('getTransactions', []))
      );
  }

  getAccountByUserID(userId: number): Observable<Account[]> {
    const url = `${this.accountUrl}/?userId=${userId}`;
    console.log(url);
    this.http.get(url).subscribe(data => {
      console.log(data);
    });
    return this.http.get<Account[]>(url);
  }

  getAccounts(): Observable<Account[]> {
    const url = `${this.accountUrl}`;
    console.log(url);
    this.http.get(url).subscribe(data => {
      console.log(data);
    });
    return this.http.get<Account[]>(url);
  }

  getTransactionTypes(): Observable<Transactiontype[]> {
    const url = `${this.transactionTypeURL}`;
    this.http.get(url).subscribe(data => {
      console.log(data);
    });
    return this.http.get<Transactiontype[]>(url);
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);
      console.log(`${operation} failed: ${error.message}`);
      return of(result as T);
    };
  }

  addDepositTransaction(transaction: Transaction) {

    return this.http.post<Transaction>(this.transactionUrl, transaction, httpOptions);

  }

  getLatestTransactions(): Observable<Transaction[]> {
    return this.http.get<Transaction[]>(this.latestTransactionURL)
      .pipe(
        tap(_ => this.log('Most Recent Transactions')),
        catchError(this.handleError<Transaction[]>('getLatestTransactions', []))
      );
  }

  getLatestTransactionsByUser(userId: number): Observable<Transaction[]> {
    const url = `${this.transactionUrl}${userId}`;
    // console.log(url);
    return this.http.get<Transaction[]>(url)
      .pipe(
        tap(_ => this.log('Most Recent Transactions by User')),
        catchError(this.handleError<Transaction[]>('getLatestTransactionsByUser', []))
      );
  }
}
