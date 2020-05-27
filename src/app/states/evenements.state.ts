import {Action, Selector, State, StateContext} from '@ngxs/store';
import {MainStore} from '../store';
import {ActivityService} from '../services/activity.service';
import {tap} from 'rxjs/operators';
import {GetEvenements} from '../actions/evenements.action';

@State({
  name: 'journal'
})
export class JournalState {

  constructor(private service: ActivityService) {
  }

  @Selector()
  static getEvenements(store: MainStore) {
    return store.journal;
  }

  @Action(GetEvenements)
  fetchEvenements(ctx: StateContext<MainStore>, {limit}: GetEvenements) {
    return this.service.getActivities(limit).pipe(
      tap(res => ctx.patchState({journal: res.content}))
    );
  }

}
