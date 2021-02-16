import { Component, OnInit } from '@angular/core';
import { WebSocketService } from '../web-socket.service';
import { UsersService } from '../users.service';
import { UserInterface } from '../user';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.sass'],
})
export class HomeComponent implements OnInit {
  public users: UserInterface[] = [];

  constructor(
    private usersServices: UsersService,
    private webSocketService: WebSocketService
  ) {}

  ngOnInit(): void {
    this.usersServices.getUsers().subscribe((allUsers) => {
      this.users = allUsers;
    });

    this.webSocketService.listen('new-user-message').subscribe(() => {
      this.usersServices.getUsers().subscribe((allUsers) => {
        this.users = allUsers;
      });
    });
  }
}
