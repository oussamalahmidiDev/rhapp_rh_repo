import { State, StateContext, Action } from "@ngxs/store";
import { NotificationsService } from "../services/notifications.service";
import { MainStore } from "../store";
import { tap } from "rxjs/operators";
import {
  GetNotifications,
  AddNotification,
  MarkAllAsSeen,
} from "../actions/notifications.action";
import { patch, insertItem } from "@ngxs/store/operators";
import { Notification } from "../models/notification";
@State({
  name: "notifications",
})
export class NotificationsState {
  constructor(private service: NotificationsService) {}

  @Action(GetNotifications)
  fetchNotifications(ctx: StateContext<MainStore>) {
    return this.service
      .get()
      .pipe(tap((notifications) => ctx.patchState({ notifications })));
  }

  @Action(AddNotification)
  addNotification(ctx: StateContext<MainStore>, { payload }: AddNotification) {
    return ctx.setState(patch({ notifications: insertItem(payload) }));
  }

  @Action(MarkAllAsSeen)
  markSeen(ctx: StateContext<MainStore>) {
    return this.service.markAsSeen().pipe(
      tap(() =>
        ctx.patchState({
          notifications: ctx
            .getState()
            .notifications.map(
              (notification) =>
                (notification = { ...notification, isSeen: true })
            ),
        })
      )
    );
  }
}
