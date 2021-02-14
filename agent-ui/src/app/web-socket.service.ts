import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import * as ioSocket from 'socket.io-client';

@Injectable({
  providedIn: 'root',
})
export class WebSocketService {
  socket: any;
  readonly uri: string = 'ws://localhost:8080';

  constructor() {
    this.socket = ioSocket.io(this.uri);
  }

  listen(eventName: string) {
    return new Observable((subscriber) => {
      this.socket.on(eventName, (data: any) => {
        subscriber.next(data);
      });
    });
  }

  emit(eventName: string, data: any) {
    this.socket.emit(eventName, data);
  }
}
