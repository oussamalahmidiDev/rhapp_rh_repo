import { State, StateContext, Action } from '@ngxs/store';
import { NotificationsService } from '../services/notifications.service';
import { MainStore } from '../store';
import { tap } from 'rxjs/operators';
import { GetNotifications } from '../actions/notifications.action';


@State({
      name: 'notifications'
})
export class NotificationsState {
      constructor(private service: NotificationsService) {}

      @Action(GetNotifications)
      fetchNotifications(ctx: StateContext<MainStore>) {
            return this.service.get().pipe(
                  tap(res => ctx.patchState({ notifications: [...res] }))
            );
      }

}