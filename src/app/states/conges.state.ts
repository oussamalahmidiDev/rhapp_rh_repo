import {Action, Selector, State, StateContext, Store} from '@ngxs/store';
import {CongesService} from '../services/conges.service';
import {MainStore} from '../store';
import {tap} from 'rxjs/operators';
import {AddCongeMaladie, GetConges} from '../actions/conges.action';
import {insertItem, patch} from '@ngxs/store/operators';
import {SetFetchingState} from '../actions/app.action';

@State({
  name: 'conges'
})
export class CongesState {

  constructor(private service: CongesService, private store: Store) {
  }

  @Selector()
  static getConges(state: MainStore) {
    return state.conges.filter(conge => conge.type.typeConge !== 'MALADIE');
  }

  @Selector()
  static getCongesMaladie(state: MainStore) {
    return state.conges.filter(conge => conge.type.typeConge === 'MALADIE');
  }

  @Action(GetConges)
  fetchConges(ctx: StateContext<MainStore>) {
    this.store.dispatch(new SetFetchingState(true));
    ctx.patchState({fetching: true});
    return this.service.getConges().pipe(
      tap(res => {
        ctx.patchState({conges: res, fetching: false});
      })
    );
  }

  @Action(AddCongeMaladie)
  createCongeMaladie(ctx: StateContext<MainStore>, {payload}: AddCongeMaladie) {
    return this.service.createCongeMaladie(payload).pipe(
      tap(res => ctx.setState(patch({conges: insertItem(res)})))
    );
  }
}
