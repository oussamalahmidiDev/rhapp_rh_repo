import {Action, Selector, State, StateContext} from '@ngxs/store';
import {PosteService} from '../services/poste.service';
import {MainStore} from '../store';
import {tap} from 'rxjs/operators';
import {AddService, GetServices} from '../actions/services.action';
import {insertItem, patch} from '@ngxs/store/operators';

@State({
  name: 'services'
})
export class ServicesState {

  constructor(private service: PosteService) {
  }

  @Selector()
  static getServices(store: MainStore) {
    return store.services;
  }

  @Action(GetServices)
  fetchServices(ctx: StateContext<MainStore>) {
    return this.service.getServices().pipe(
      tap(res => ctx.patchState({services: res}))
    );
  }

  @Action(AddService)
  addDirection(ctx: StateContext<MainStore>, {payload}: AddService) {
    ctx.setState(patch({services: insertItem(payload)}));
  }

}
