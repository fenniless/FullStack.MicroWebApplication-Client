import {Component, Input, OnInit} from '@angular/core';
import {Profile} from '../user';
import {UserService} from '../user.service';
import {Router} from "@angular/router";

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
  constructor(private userService: UserService, private router: Router) {
    this.defaultName = 'Login';
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
  }

  static enableGeneralButtons(): void {
    (document.getElementById('smallLogo') as HTMLInputElement).hidden = true;
    (document.getElementById('btnGroupDrop1') as HTMLInputElement).hidden = false;
    (document.getElementById('bigLogo') as HTMLInputElement).hidden = false;
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
    (document.getElementById('smallLogo') as HTMLInputElement).hidden = false;
    (document.getElementById('btnGroupDrop1') as HTMLInputElement).hidden = true;
    (document.getElementById('bigLogo') as HTMLInputElement).hidden = true;
  }
}
