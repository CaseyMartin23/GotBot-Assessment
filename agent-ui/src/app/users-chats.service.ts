import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { UserChatInterface } from './userChat';

@Injectable({
  providedIn: 'root',
})
export class UsersChatsService {
  private userChatsUrl = 'http://localhost:8080/user-chats/';

  constructor(private http: HttpClient) {}

  getUserAndChats(userId: string): Observable<UserChatInterface[]> {
    return this.http.get<UserChatInterface[]>(this.userChatsUrl + userId);
  }
}
