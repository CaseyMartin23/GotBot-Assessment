import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UsersChatsService } from '../users-chats.service';
import { UserChatInterface } from '../userChat';
import { WebSocketService } from '../web-socket.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-chat-window',
  templateUrl: './chat-window.component.html',
  styleUrls: ['./chat-window.component.sass'],
})
export class ChatWindowComponent implements OnInit {
  public userId: string | null = '';
  public userConversation: UserChatInterface[] = [];
  public message: string = '';

  constructor(
    private route: ActivatedRoute,
    private userChatService: UsersChatsService,
    private webSocketService: WebSocketService
  ) {}

  ngOnInit(): void {
    this.userId = this.route.snapshot.paramMap.get('userId');

    if (this.userId) {
      this.userChatService
        .getUserAndChats(this.userId)
        .subscribe((userChats) => {
          console.log('userChats->', userChats);
          this.userConversation = userChats;
        });
    }

    this.webSocketService.listen('user-message').subscribe((message) => {
      const userMessage: UserChatInterface = message as UserChatInterface;
      this.userConversation.push(userMessage);
    });
  }

  sendMessage(formData: NgForm) {
    let response = {
      message: '',
      isUserMessage: false,
    };
    if (formData.value && formData.value['agent-response'] && this.userId) {
      // console.log("agent-response->", formData.value["agent-response"])
      this.webSocketService.emit('agent-message', {
        userId: this.userId,
        response: { ...response, message: formData.value['agent-response'] },
      });
    }
    this.message = '';
    this.userConversation.push(response);
  }
}
