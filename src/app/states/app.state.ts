import {Action, Selector, State, StateContext} from '@ngxs/store';
import {MainStore} from '../store';
import {SetFetchingState} from '../actions/app.action';

@State({
  name: 'appState'
})
export class AppState {

  @Selector()
  static getFetchingState(state: MainStore) {
    return state.fetching;
  }

  @Action(SetFetchingState)
  setFetchingState(ctx: StateContext<MainStore>, {value}: SetFetchingState) {
    return ctx.patchState({fetching: value});
  }

}
