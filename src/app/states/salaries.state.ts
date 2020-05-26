import {Action, Selector, State, StateContext, Store} from '@ngxs/store';
import {MainStore} from '../store';
import {SalariesService} from '../services/salaries.service';
import {
  AddAvantage,
  AddRetraite,
  AddSalarie,
  DeleteSalariePoste,
  GetSalarieById,
  GetSalaries,
  LoadSalariePhoto,
  RetirerAvantages,
  ValiderRetraite
} from '../actions/salaries.action';
import {tap} from 'rxjs/operators';
import {insertItem, patch, updateItem} from '@ngxs/store/operators';
import {RetraitesService} from '../services/retraites.service';
import {AvantagesService} from '../services/avantages.service';
import {DeletePosteSalarie} from '../actions/postes.action';
import {SetFetchingState} from '../actions/app.action';
import {Salarie} from '../models/salarie';

@State<MainStore>({
  name: 'salaries'
})
export class SalariesState {

  constructor(
    private service: SalariesService,
    private retraitesService: RetraitesService,
    private avantagesService: AvantagesService,
    private store: Store
  ) {
  }

  @Selector()
  static getSelectedSalarie(store: MainStore) {
    return store.selectedSalarie;
  }

  @Selector()
  static getSelectedSalarieAbsences(store: MainStore) {
    return store.selectedSalarie.absences;
  }

  @Selector()
  static getSelectedSalarieAvantages(store: MainStore) {
    return store.selectedSalarie.avantages;
  }

  @Selector()
  static getSelectedSalarieRetraite(store: MainStore) {
    return store.selectedSalarie.retraite;
  }

  @Selector()
  static getSelectedSalarieConges(store: MainStore) {
    return store.selectedSalarie.conges;
  }

  @Selector()
  static getSalaries(store: MainStore) {
    return store.salaries;
  }

  @Action(GetSalaries)
  fetchSalaries(ctx: StateContext<MainStore>) {
    this.store.dispatch(new SetFetchingState(true));
    return this.service.getSalaries().pipe(
      tap((res: Salarie[]) => {
        ctx.setState(patch({salaries: res}));
      })
    );
  }

  @Action(LoadSalariePhoto)
  fetchSalariePhoto(ctx: StateContext<MainStore>, {id, payload}: LoadSalariePhoto) {
    const salarie = ctx.getState().salaries.find(salarie => salarie.id === id);
    ctx.setState(patch({salaries: updateItem<Salarie>(salarie => salarie.id === id, {...salarie, photo: payload})}));

  }

  @Action(GetSalarieById)
  fetchSalarieById(ctx: StateContext<MainStore>, {id}: GetSalarieById) {

    return this.service.getSalarie(id).pipe(
      tap(res => {
        ctx.patchState({selectedSalarie: res});
      })
    );
  }

  @Action(DeleteSalariePoste)
  deletePoste(ctx: StateContext<MainStore>) {
    return this.store.dispatch(new DeletePosteSalarie(ctx.getState().selectedSalarie.poste.id)).subscribe(
      () => ctx.patchState({selectedSalarie: {...ctx.getState().selectedSalarie, poste: null}})
    );
  }

  @Action(AddSalarie)
  addSalarie(ctx: StateContext<MainStore>, {payload}: AddSalarie) {
    return this.service.createSalarie(payload).pipe(
      tap(res => ctx.setState(patch({salaries: insertItem(res)})))
    );
  }

  @Action(AddRetraite)
  addRetraite(ctx: StateContext<MainStore>, {payload}: AddRetraite) {
    return this.retraitesService.createRetraite(payload).pipe(
      tap(
        res => ctx.patchState({selectedSalarie: {...ctx.getState().selectedSalarie, retraite: res}}),
        error => alert(error.error)
      )
    );
  }

  @Action(AddAvantage)
  addAvantage(ctx: StateContext<MainStore>, {payload}: AddAvantage) {
    return this.avantagesService.createAvantage(ctx.getState().selectedSalarie.id, payload).pipe(
      tap(
        res => ctx.patchState({
          selectedSalarie: {
            ...ctx.getState().selectedSalarie,
            avantages: [...ctx.getState().selectedSalarie.avantages, res]
          }
        })
      ));
  }

  @Action(RetirerAvantages)
  retirerAvantages(ctx: StateContext<MainStore>, {payload}: RetirerAvantages) {
    return this.avantagesService.retirerAvantage(ctx.getState().selectedSalarie.id, payload).pipe(
      tap(res => ctx.patchState({selectedSalarie: res}))
    );
  }

  @Action(ValiderRetraite)
  validerRetraite(ctx: StateContext<MainStore>) {
    return this.retraitesService.validerRetraite(ctx.getState().selectedSalarie.id).pipe(
      tap(res => ctx.patchState({selectedSalarie: {...ctx.getState().selectedSalarie, retraite: res}}))
    );
  }
}
