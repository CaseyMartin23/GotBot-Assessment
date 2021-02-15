import { Component, OnInit } from '@angular/core';
import { UsersService } from '../users.service';
import { UserInterface } from '../user';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.sass'],
})
export class HomeComponent implements OnInit {
  public users: UserInterface[] = [];

  constructor(private usersServices: UsersService) {}

  ngOnInit(): void {
    try {
      this.usersServices.getUsers().subscribe((allUsers) => {
        this.users = allUsers;
      });
    } catch (err) {
      console.error('Unable to get users:', err);
    }
  }
}
