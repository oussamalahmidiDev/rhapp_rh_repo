import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

import * as SockJS from 'sockjs-client';
import * as Stomp from 'stompjs';
import { TokenService } from './token.service';

@Injectable({
  providedIn: 'root'
})
export class WebsocketService {

  BASE_URL = environment.BASE_URL;
  stompClient: any;

  constructor(private tokenService: TokenService) { 
    console.log("Initialize WebSocket Connection");
    const ws = new SockJS(`${this.BASE_URL.substr(0, this.BASE_URL.length - 3)}/ws`);
    this.stompClient = Stomp.over(ws);
    this.stompClient.connect({ Authorization: 'Bearer ' + this.tokenService.getToken() }, _ => {
      this.stompClient.subscribe('/notifications', e => {
        console.log("Message Recieved from Server :: " + e);
      });
    }, err => console.log('WS error :', err));
  }

  send(message) {
    console.log("calling logout api via web socket");
    this.stompClient.send("/app/hello", {}, message);
  }
}
