import {Component, Input, OnInit} from '@angular/core';
import {User} from '../user';
import {UserService} from '../user.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
  users: User[];
  selectedUser: User;
  defaultName: string;
  userId: number;

  @Input() user: User;
  constructor(private userService: UserService) {
    this.defaultName = 'Users';
  }

  ngOnInit() {
    this.getUsers();
  }

  getUsers(): void {
    this.userService.getUsers().subscribe(users => this.users = users);
  }
  onSelect(user: User): void {
    this.selectedUser = user;
    this.defaultName = this.selectedUser.userName;
    this.userId = this.selectedUser.id;
  }
}
