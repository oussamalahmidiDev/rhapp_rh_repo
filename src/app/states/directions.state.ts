import {Action, Selector, State, StateContext} from '@ngxs/store';
import {PosteService} from '../services/poste.service';
import {MainStore} from '../store';
import {tap} from 'rxjs/operators';
import {AddDirection, GetDirections} from '../actions/directions.action';
import {insertItem, patch} from '@ngxs/store/operators';

@State({
  name: 'directions'
})
export class DirectionsState {

  constructor(private service: PosteService) {
  }

  @Selector()
  static getDirections(store: MainStore) {
    return store.directions;
  }

  @Action(GetDirections)
  fetchDirections(ctx: StateContext<MainStore>) {
    return this.service.getDirections().pipe(
      tap(res => ctx.patchState({directions: res}))
    );
  }

  @Action(AddDirection)
  addDirection(ctx: StateContext<MainStore>, {payload}: AddDirection) {
    ctx.setState(patch({directions: insertItem(payload)}));
  }

}
