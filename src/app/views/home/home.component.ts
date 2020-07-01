import { Component, ElementRef, OnInit, ViewChild } from "@angular/core";
import { User } from "../../models/user";
import { Notification } from "../../models/notification";
import { Router } from "@angular/router";
import { Observable, Subscription } from "rxjs";
import { Select, Store } from "@ngxs/store";
import { ProfileState } from "src/app/states/profile.state";
import { AppState } from "src/app/states/app.state";
import {
  GetNotifications,
  AddNotification,
} from "src/app/actions/notifications.action";
import { WebsocketService } from "src/app/services/websocket.service";
import { MatSnackBar } from "@angular/material";
import { GetAbsences } from "src/app/actions/absences.action";
import { GetConges } from "src/app/actions/conges.action";

@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.css"],
})
export class HomeComponent implements OnInit {
  @Select(ProfileState.getProfile)
  profile: Observable<User>;

  @Select(AppState.getFetchingState)
  loading: Observable<boolean>;

  notificationsCount = 0;

  websocketSubscription: Subscription;

  @ViewChild("searchField") input: ElementRef;

  constructor(
    public router: Router,
    public store: Store,
    private websocketService: WebsocketService,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit() {
    // this.store.dispatch(new GetNotifications());
  }
}
