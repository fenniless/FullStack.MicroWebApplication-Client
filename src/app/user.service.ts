import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable, of} from 'rxjs';
import {catchError, tap} from 'rxjs/operators';
import {User} from './user';
import { MessageService } from './message.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private userUrl = 'http://localhost:8080/budget/user';
  private log(message: string) {
    this.messageService.add(`HeroService: ${message}`);
  }

  constructor(private http: HttpClient,
              private messageService: MessageService
  ) {
  }

  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(this.userUrl)
      .pipe(
        tap(_ => this.log('User Data')),
        catchError(this.handleError<User[]>('getUsers', []))
      );
  }
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);
      console.log(`${operation} failed: ${error.message}`);
      return of(result as T);
    };
  }
  getUser(id: number): Observable<User> {
    const url = `${this.userUrl}/{id}`;
    return this.http.get<User>(url)
      .pipe(
        tap(_ => this.log(`fetched user id=${id}`)),
        catchError(this.handleError<User>(`getUser id=${id}`))
      );
  }
  searchUsers(term: string): Observable<User[]> {
    if (!term.trim()) {
      return of([]);
    }
  }
}
