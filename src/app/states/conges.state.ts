import { Action, Selector, State, StateContext, Store } from "@ngxs/store";
import { CongesService } from "../services/conges.service";
import { MainStore } from "../store";
import { tap } from "rxjs/operators";
import {
  AddCongeMaladie,
  DeleteConge,
  GetConges,
  ModifierConge,
  RepondreConge,
  GetParametres,
  ChangeParametres,
  DeclarerRetour,
} from "../actions/conges.action";
import {
  insertItem,
  patch,
  removeItem,
  updateItem,
} from "@ngxs/store/operators";
import { SetFetchingState } from "../actions/app.action";
import { Conge } from "../models/conge";

@State({
  name: "conges",
})
export class CongesState {
  constructor(private service: CongesService, private store: Store) {}

  @Selector()
  static getConges(state: MainStore) {
    return state.conges.filter((conge) => conge.type.typeConge !== "MALADIE");
  }

  @Selector()
  static getCongesMaladie(state: MainStore) {
    return state.conges.filter((conge) => conge.type.typeConge === "MALADIE");
  }

  @Action(GetConges)
  fetchConges(ctx: StateContext<MainStore>) {
    this.store.dispatch(new SetFetchingState(true));
    ctx.patchState({ fetching: true });
    return this.service.getConges().pipe(
      tap((res) => {
        ctx.patchState({ conges: res, fetching: false });
      })
    );
  }

  @Action(GetParametres)
  getParametres(ctx: StateContext<MainStore>) {
    return this.service
      .getParametres()
      .pipe(tap((parametres) => ctx.patchState({ parametres })));
  }

  @Action(ChangeParametres)
  setParametres(ctx: StateContext<MainStore>, { payload }: ChangeParametres) {
    return this.service
      .setParametres(payload)
      .pipe(tap((parametres) => ctx.patchState({ parametres })));
  }

  @Action(AddCongeMaladie)
  createCongeMaladie(
    ctx: StateContext<MainStore>,
    { payload }: AddCongeMaladie
  ) {
    return this.service
      .createCongeMaladie(payload)
      .pipe(tap((res) => ctx.setState(patch({ conges: insertItem(res) }))));
  }

  @Action(ModifierConge)
  modifierConge(ctx: StateContext<MainStore>, { id, payload }: ModifierConge) {
    return this.service
      .modifierConge(id, payload)
      .pipe(
        tap((res) =>
          ctx.setState(
            patch({ conges: updateItem((item) => item.id === id, res) })
          )
        )
      );
  }

  @Action(DeclarerRetour)
  declarerRetour(ctx: StateContext<MainStore>, { payload }: DeclarerRetour) {
    return this.service
      .declarerRetour(payload.id)
      .pipe(
        tap((res) =>
          ctx.setState(
            patch({ conges: updateItem((item) => item.id === payload.id, res) })
          )
        )
      );
  }

  @Action(RepondreConge)
  repondreConge(ctx: StateContext<MainStore>, { id, payload }: RepondreConge) {
    return this.service
      .repondreConge(id, payload)
      .pipe(
        tap((res) =>
          ctx.setState(
            patch({ conges: updateItem((item) => item.id === id, res) })
          )
        )
      );
  }

  @Action(DeleteConge)
  deleteAbsence(ctx: StateContext<MainStore>, { id }: DeleteConge) {
    return this.service
      .deleteConge(id)
      .pipe(
        tap((res) =>
          ctx.setState(
            patch({ conges: removeItem<Conge>((conge) => conge.id === id) })
          )
        )
      );
  }
}
