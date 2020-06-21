import { Action, Selector, State, StateContext, Store } from "@ngxs/store";
import { AbsencesService } from "../services/absences.service";
import { MainStore } from "../store";
import {
  AddAbsence,
  DeleteAbsence,
  GetAbsences,
  RepondreAbsence,
} from "../actions/absences.action";
import { tap } from "rxjs/operators";
import {
  insertItem,
  patch,
  removeItem,
  updateItem,
} from "@ngxs/store/operators";
import { SetFetchingState } from "../actions/app.action";
import { Absence } from "../models/absence";
import { RepondreSelectedSalarieAbsence } from "../actions/salaries.action";
import { Salarie } from "../models/salarie";
import { SalariesState } from "./salaries.state";

@State({
  name: "absences",
})
export class AbsencesState {
  constructor(private service: AbsencesService, private store: Store) {}

  @Selector()
  static getAbsences(state: MainStore) {
    return state.absences;
  }

  @Action(GetAbsences)
  fetchAbsences(ctx: StateContext<MainStore>) {
    this.store.dispatch(new SetFetchingState(true));
    return this.service.getAbsences().pipe(
      tap((res) => {
        ctx.patchState({ absences: res });
      })
    );
  }

  @Action(AddAbsence)
  createAbsence(ctx: StateContext<MainStore>, { payload }: AddAbsence) {
    ctx.setState(patch({ absences: insertItem(payload) }));
  }

  @Action(RepondreAbsence)
  repondre(ctx: StateContext<MainStore>, { id, avis }: RepondreAbsence) {
    return this.service.repondre(id, avis).pipe(
      tap((res) => {
        console.log("TEST");
        ctx.setState(
          patch({
            absences: updateItem<Absence>((absence) => absence.id === id, res),
          })
        );
      })
    );
  }

  @Action(DeleteAbsence)
  deleteAbsence(ctx: StateContext<MainStore>, { id }: DeleteAbsence) {
    return this.service.deleteAbsence(id).pipe(
      tap((res) =>
        ctx.setState(
          patch({
            absences: removeItem<Absence>((absence) => absence.id === id),
          })
        )
      )
    );
  }
}
