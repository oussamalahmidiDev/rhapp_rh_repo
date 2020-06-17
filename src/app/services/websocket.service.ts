import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";

import * as SockJS from "sockjs-client";
import * as Stomp from "stompjs";
import { TokenService } from "./token.service";
import { StompConfig, StompRService, StompState } from "@stomp/ng2-stompjs";

@Injectable({
  providedIn: "root",
})
export class WebsocketService {
  BASE_URL = environment.BASE_URL;
  stompClient: any;

  public getStomp() {
    return this.stompService;
  }

  constructor(
    private tokenService: TokenService,
    public stompService: StompRService
  ) {}

  public connect() {
    console.log("Token", this.tokenService.getToken());
    this.stompService.config = {
      headers: {
        Authorization: "Bearer " + this.tokenService.getToken(),
      },
      heartbeat_in: 30000,
      heartbeat_out: 30000,
      reconnect_delay: 5000,
      url: () =>
        new SockJS(`${this.BASE_URL.substr(0, this.BASE_URL.length - 3)}/ws`),
      debug: true,
    };
    this.stompService.initAndConnect();

    this.stompService.webSocketErrors$.subscribe((error) => {
      console.log("Error receiving connection", error);
    });
  }

  send(message) {
    console.log("calling logout api via web socket");
    this.stompClient.send("/app/hello", {}, message);
  }
}
