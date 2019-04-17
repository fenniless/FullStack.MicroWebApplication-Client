import {Injectable} from '@angular/core';

import {HttpClient, HttpHeaders} from '@angular/common/http';

import {Observable, of} from 'rxjs';
import {catchError, map, tap} from 'rxjs/operators';

import {Transaction} from './transaction';
import {Account} from './account';
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

  private transactionUrl = 'http://localhost:8080/budget/transaction/';
  private accountUrl = 'http://localhost:8080/budget/account';

  // private transactionUrl = 'https://budgetapp-server.herokuapp.com/budget/transaction/';

  private log(message: string) {
    this.messageService.add(`HeroService: ${message}`);
  }

  getTransactions(): Observable<Transaction[]> {
    // console.log('Provider made');
    // this.http.get('http://localhost:8080/budget/transaction/').subscribe(data => {
    //   console.log(data); });
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
}
