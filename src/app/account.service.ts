import {Injectable} from '@angular/core';
import {Observable, of} from 'rxjs';
import {catchError, tap} from 'rxjs/operators';
import {Account} from './account';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {MessageService} from './message.service';
import {Accounttype} from './accounttype';

const httpOptions = {
    headers: new HttpHeaders({'Content-Type': 'application/json'})
};

@Injectable({
    providedIn: 'root'
})
export class AccountService {
    // private baseUri = 'http://localhost:8080/budget/';
     private baseUri = 'https://budgetapp-server.herokuapp.com/budget/';

    private accountUrl = `${this.baseUri}/account`;

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

    getAccountTypes(): Observable<Accounttype[]> {
        const url = `${this.baseUri}/accounttype`;
        // this.http.get(url).subscribe(data => {
        //     console.log(data);
        // });
        return this.http.get<Accounttype[]>(url);
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
            tap((newAccount: Account) => this.log(`added account`)),
            catchError(this.handleError<Account>('addAccount')));
    }
}
