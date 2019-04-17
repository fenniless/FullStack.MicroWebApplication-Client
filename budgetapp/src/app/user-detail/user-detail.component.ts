import {Component, Input, OnInit} from '@angular/core';
import {Profile} from '../user';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { UserService} from '../user.service';

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.css']
})
export class UserDetailComponent implements OnInit {

  @Input() profile: Profile;
  constructor(private route: ActivatedRoute,
              private service: UserService,
              private location: Location
  ) { }

  ngOnInit(): void {
    this.getUser();
  }
  getUser(): void {
    const userId = +this.route.snapshot.paramMap.get('userId');
    this.service.getUser(userId)
      .subscribe(user => this.profile = user);
  }
  goBack(): void {
    this.location.back();
  }

}
