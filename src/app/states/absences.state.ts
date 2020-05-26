import {Action, Selector, State, StateContext, Store} from '@ngxs/store';
import {AbsencesService} from '../services/absences.service';
import {MainStore} from '../store';
import {AddAbsence, GetAbsences} from '../actions/absences.action';
import {tap} from 'rxjs/operators';
import {insertItem, patch} from '@ngxs/store/operators';
import {SetFetchingState} from '../actions/app.action';

@State({
  name: 'absences'
})
export class AbsencesState {

  constructor(private service: AbsencesService, private store: Store) {
  }

  @Selector()
  static getAbsences(state: MainStore) {
    return state.absences;
  }

  @Action(GetAbsences)
  fetchAbsences(ctx: StateContext<MainStore>) {
    this.store.dispatch(new SetFetchingState(true));
    return this.service.getAbsences().pipe(
      tap(res => {
        ctx.patchState({absences: res});
      })
    );
  }

  @Action(AddAbsence)
  createAbsence(ctx: StateContext<MainStore>, {payload}: AddAbsence) {
    ctx.setState(patch({absences: insertItem(payload)}));
    // return this.service.createAbsence(payload).pipe(
    //   tap(res => ctx.setState(patch({absences: insertItem(res)})))
    // );
  }
}
