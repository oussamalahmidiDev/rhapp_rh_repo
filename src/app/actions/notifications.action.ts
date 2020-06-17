import { Notification } from "../models/notification";

export class GetNotifications {
  static readonly type = "[Notifications] Get";
}

export class AddNotification {
  static readonly type = "[Notifications] Add";
  constructor(public payload: Notification) {}
}

export class MarkAllAsSeen {
  static readonly type = "[Notifications] Mark Seen";
}
