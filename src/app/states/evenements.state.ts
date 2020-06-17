import { Action, Selector, State, StateContext } from "@ngxs/store";
import { MainStore } from "../store";
import { ActivityService } from "../services/activity.service";
import { tap } from "rxjs/operators";
import {
  GetUsersEvenements,
  GetPersonnalEvenements,
} from "../actions/evenements.action";

@State({
  name: "journal",
})
export class JournalState {
  constructor(private service: ActivityService) {}

  @Selector()
  static getUsersEvenements(store: MainStore) {
    return store.journal.utilisateurs;
  }

  @Selector()
  static getPersonnalEvenements(store: MainStore) {
    return store.journal.personnel;
  }

  @Action(GetUsersEvenements)
  fetchEvenements(ctx: StateContext<MainStore>, { limit }: GetUsersEvenements) {
    return this.service.getActivities(limit).pipe(
      tap((res) =>
        ctx.patchState({
          journal: { ...ctx.getState().journal, utilisateurs: res.content },
        })
      )
    );
  }

  @Action(GetPersonnalEvenements)
  fetchPersonnalEvenements(
    ctx: StateContext<MainStore>,
    { limit }: GetPersonnalEvenements
  ) {
    return this.service.getPersonnalActivities(limit).pipe(
      tap((res) =>
        ctx.patchState({
          journal: {
            ...ctx.getState().journal,
            personnel: res.content,
          },
        })
      )
    );
  }
}
