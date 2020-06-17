import { Component, OnInit } from "@angular/core";
import { MatDialogRef } from "@angular/material/dialog";
import { Observable } from "rxjs";
import { Select, Store } from "@ngxs/store";
import { MarkAllAsSeen } from "src/app/actions/notifications.action";

@Component({
  selector: "app-notification-drawer",
  templateUrl: "./notification-drawer.component.html",
  styleUrls: ["./notification-drawer.component.css"],
})
export class NotificationDrawerComponent implements OnInit {
  @Select((store) => store.notifications.notifications)
  notifications: Observable<Notification>;

  constructor(
    public dialogRef: MatDialogRef<NotificationDrawerComponent>,
    private store: Store
  ) {}

  ngOnInit(): void {}

  closeModal() {
    this.dialogRef.close();
    this.store.dispatch(new MarkAllAsSeen());
  }
}
