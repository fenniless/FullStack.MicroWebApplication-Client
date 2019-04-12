import { Injectable } from '@angular/core';

import { HttpClient, HttpHeaders } from '@angular/common/http';
 
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
 
import { Transaction } from './transaction';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class TransactionService {


  constructor(private http: HttpClient) { }

//  private transactionUrl = 'http://localhost:8080/budget/transcation';

  //getTransactions(transaction: Transaction): Observable<Transaction[]> {
  getTransactions(): Observable<Transaction[]> {
       console.log('Provider made');
     this.http.get('http://localhost:8080/budget/transaction/').subscribe(data => {
     console.log(data); })

  	// return this.http.get<Transaction[]>($this.transactionUrl});
  	return null;
  }
	
}
