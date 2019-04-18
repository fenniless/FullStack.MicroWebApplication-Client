import {Component, OnInit} from '@angular/core';
import {Observable, Subject} from 'rxjs';
import {Profile} from '../user';
import {UserService} from '../user.service';
import {debounceTime, distinctUntilChanged, switchMap} from 'rxjs/operators';

@Component({
  selector: 'app-user-search',
  templateUrl: './user-search.component.html',
  styleUrls: ['./user-search.component.css']
})
export class UserSearchComponent implements OnInit {
  users$: Observable<Profile[]>;
  private searchTerms = new Subject<string>();

  constructor(private userService: UserService) {
  }

  search(term: string): void {
    this.searchTerms.next(term);
  }

  ngOnInit(): void {
    debounceTime(300);
    distinctUntilChanged();
    switchMap((term: string) => this.userService.searchUsers(term));
  }

}
