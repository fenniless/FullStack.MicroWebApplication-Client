import {Component, Input, OnInit} from '@angular/core';
import {Profile} from '../user';
import {UserService} from '../user.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
  profiles: Profile[];
  selectedProfile: Profile;
  defaultName: string;
  userId: number;

  @Input() profile: Profile;
  constructor(private userService: UserService) {
    this.defaultName = 'Users';
  }

  ngOnInit() {
    this.getUsers();
  }

  getUsers(): void {
    this.userService.getUsers().subscribe(profile => this.profiles = profile);
  }
  onSelect(profile: Profile): void {
    this.selectedProfile = profile;
    this.defaultName = this.selectedProfile.userName;
    this.userId = this.selectedProfile.id;
  }
}
