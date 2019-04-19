import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable, of} from 'rxjs';
import {catchError, tap} from 'rxjs/operators';
import {Profile} from './user';
import { MessageService } from './message.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private userUrl = 'https://budgetapp-server.herokuapp.com/budget/profile';
  private log(message: string) {
    this.messageService.add(`ProfileService: ${message}`);
  }

  constructor(private http: HttpClient,
              private messageService: MessageService
  ) {
  }

  getUsers(): Observable<Profile[]> {
    return this.http.get<Profile[]>(this.userUrl)
      .pipe(
        tap(_ => this.log('User Data')),
        catchError(this.handleError<Profile[]>('getUsers', []))
      );
  }
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);
      console.log(`${operation} failed: ${error.message}`);
      return of(result as T);
    };
  }
  getUser(id: number): Observable<Profile> {
    const url = `${this.userUrl}/{id}`;
    return this.http.get<Profile>(url)
      .pipe(
        tap(_ => this.log(`fetched profile id=${id}`)),
        catchError(this.handleError<Profile>(`getUser id=${id}`))
      );
  }
  searchUsers(term: string): Observable<Profile[]> {
    if (!term.trim()) {
      return of([]);
    }
  }
}
