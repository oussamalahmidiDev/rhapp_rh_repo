import {Action, Selector, State, StateContext, Store} from '@ngxs/store';
import {MainStore} from '../store';
import {PosteService} from '../services/poste.service';
import {tap} from 'rxjs/operators';
import {AffecterSalarie, CreatePoste, DeletePoste, DeletePosteSalarie, GetPostes} from '../actions/postes.action';
import {Poste} from '../models/poste';
import {patch, removeItem, updateItem} from '@ngxs/store/operators';
import {AddDirection} from '../actions/directions.action';
import {AddService} from '../actions/services.action';
import {SetFetchingState} from '../actions/app.action';

@State<MainStore>({
  name: 'postes'
})
export class PostesState {

  constructor(private service: PosteService, private store: Store) {
  }

  @Selector()
  static getPostes(store: MainStore) {
    return store.postes;
  }

  @Action(GetPostes)
  fetchPostes(ctx: StateContext<MainStore>) {
    this.store.dispatch(new SetFetchingState(true));
    return this.service.getPostes().pipe(
      tap(res => {
        ctx.patchState({postes: res});
      })
    );
  }

  @Action(CreatePoste)
  createPoste(ctx: StateContext<MainStore>, {payload}: CreatePoste) {
    return this.service.createPoste(payload).pipe(
      tap(res => {
        ctx.patchState({postes: [...ctx.getState().postes, res]});
        const directionsList = this.store.selectSnapshot(state => state.directions.directions);
        const servicesList = this.store.selectSnapshot(state => state.services.services);

        if (!directionsList.find(item => item.id === res.direction.id)) {
          console.log('CREATING NEW DIRECTION');
          this.store.dispatch(new AddDirection(res.direction));
        }

        if (!servicesList.find(item => item.id === res.service.id)) {
          console.log('CREATING NEW DIRECTION');
          this.store.dispatch(new AddService(res.service));
        }
      })
    );
  }

  @Action(AffecterSalarie)
  affecterSalarie(ctx: StateContext<MainStore>, {id, payload}: AffecterSalarie) {
    return this.service.affecterSalarie(id, payload).pipe(
      tap(res => {
        const state = ctx.getState();
        let postesList = [...state.postes];
        postesList = postesList.map(poste => {
          if (poste.salarie && poste.id !== res.id) {
            if (poste.salarie.id === res.salarie.id) {
              poste = {...poste, salarie: null};
            }
          } else if (poste.id === res.id) {
            poste = res;
          }
          return poste;
        });
        ctx.patchState({postes: postesList});
      })
    );
  }

  @Action(DeletePoste)
  deletePoste(ctx: StateContext<MainStore>, {id}: DeletePoste) {
    ctx.setState(patch({postes: removeItem<Poste>(poste => poste.id === id)}));
  }

  @Action(DeletePosteSalarie)
  deletePosteSalarie(ctx: StateContext<MainStore>, {id}: DeletePosteSalarie) {
    return this.service.deleteSalarie(id).pipe(
      tap(res => ctx.setState(patch({postes: updateItem<Poste>(poste => poste.id === res.id, res)})))
    );
  }
}
