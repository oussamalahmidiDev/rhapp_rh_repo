import { Action, Selector, State, StateContext, Store } from "@ngxs/store";
import { MainStore } from "../store";
import { SalariesService } from "../services/salaries.service";
import {
  AddAvantage,
  AddRetraite,
  AddSalarie,
  DeleteSalarie,
  DeleteSalariePoste,
  GetSalarieById,
  GetSalaries,
  LoadSalariePhoto,
  ModifierSalarie,
  RetirerAvantages,
  ValiderRetraite,
  RepondreSelectedSalarieAbsence,
  SupprimerAvantage,
  ModifierRetraite,
  SupprimerRetraite,
  RestoreSalarie,
} from "../actions/salaries.action";
import { tap } from "rxjs/operators";
import {
  insertItem,
  patch,
  removeItem,
  updateItem,
} from "@ngxs/store/operators";
import { RetraitesService } from "../services/retraites.service";
import { AvantagesService } from "../services/avantages.service";
import { DeletePosteSalarie } from "../actions/postes.action";
import { SetFetchingState } from "../actions/app.action";
import { Salarie } from "../models/salarie";
import { AbsencesService } from "../services/absences.service";

@State<MainStore>({
  name: "salaries",
})
export class SalariesState {
  constructor(
    private service: SalariesService,
    private retraitesService: RetraitesService,
    private avantagesService: AvantagesService,
    private absencesService: AbsencesService,
    private store: Store
  ) {}

  @Selector()
  static getSelectedSalarie(store: MainStore) {
    return store.selectedSalarie;
  }

  @Selector()
  static nonRetiredSalaries(store: MainStore) {
    return store.salaries.filter(
      (salarie) =>
        salarie.retraite === undefined || salarie.retraite.etat !== "VALID"
    );
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
        ctx.setState(patch({ salaries: res }));
      })
    );
  }

  @Action(ModifierSalarie)
  modifierSalarie(
    ctx: StateContext<MainStore>,
    { id, payload }: ModifierSalarie
  ) {
    return this.service
      .modifierSalarie(id, payload)
      .pipe(
        tap((res) =>
          ctx.setState(
            patch({ salaries: updateItem((item) => item.id === id, res) })
          )
        )
      );
  }

  @Action(LoadSalariePhoto)
  fetchSalariePhoto(
    ctx: StateContext<MainStore>,
    { id, payload }: LoadSalariePhoto
  ) {
    const salarie = ctx
      .getState()
      .salaries.find((salarie) => salarie.id === id);
    ctx.setState(
      patch({
        salaries: updateItem<Salarie>((salarie) => salarie.id === id, {
          ...salarie,
          photo: payload,
        }),
      })
    );
  }

  @Action(GetSalarieById)
  fetchSalarieById(ctx: StateContext<MainStore>, { id }: GetSalarieById) {
    return this.service.getSalarie(id).pipe(
      tap((res) => {
        ctx.patchState({ selectedSalarie: res });
      })
    );
  }

  @Action(DeleteSalariePoste)
  deletePoste(ctx: StateContext<MainStore>) {
    return this.store
      .dispatch(new DeletePosteSalarie(ctx.getState().selectedSalarie.poste.id))
      .subscribe(() =>
        ctx.patchState({
          selectedSalarie: {
            ...ctx.getState().selectedSalarie,
            poste: undefined,
          },
        })
      );
  }

  @Action(AddSalarie)
  addSalarie(ctx: StateContext<MainStore>, { payload }: AddSalarie) {
    return this.service
      .createSalarie(payload)
      .pipe(tap((res) => ctx.setState(patch({ salaries: insertItem(res) }))));
  }

  @Action(AddRetraite)
  addRetraite(ctx: StateContext<MainStore>, { payload }: AddRetraite) {
    return this.retraitesService.createRetraite(payload).pipe(
      tap(
        (res) =>
          ctx.patchState({
            selectedSalarie: {
              ...ctx.getState().selectedSalarie,
              retraite: res,
            },
          }),
        (error) => alert(error.error)
      )
    );
  }

  @Action(AddAvantage)
  addAvantage(ctx: StateContext<MainStore>, { payload }: AddAvantage) {
    return this.avantagesService
      .createAvantage(ctx.getState().selectedSalarie.id, payload)
      .pipe(
        tap((res) =>
          ctx.patchState({
            selectedSalarie: {
              ...ctx.getState().selectedSalarie,
              avantages: [...ctx.getState().selectedSalarie.avantages, res],
            },
          })
        )
      );
  }

  @Action(ModifierRetraite)
  modifierRetraite(
    ctx: StateContext<MainStore>,
    { payload }: ModifierRetraite
  ) {
    const { type, reference, dateRetraite } = payload;
    return this.retraitesService
      .modifierRetraite(ctx.getState().selectedSalarie.id, {
        type,
        reference,
        dateRetraite,
      })
      .pipe(
        tap((retraite) =>
          ctx.patchState({
            selectedSalarie: { ...ctx.getState().selectedSalarie, retraite },
          })
        )
      );
  }

  @Action(SupprimerRetraite)
  supprimerRetraite(ctx: StateContext<MainStore>, { id }: SupprimerRetraite) {
    return this.retraitesService
      .supprimerRetraite(ctx.getState().selectedSalarie.id)
      .pipe(
        tap((retraite) =>
          ctx.patchState({
            selectedSalarie: {
              ...ctx.getState().selectedSalarie,
              retraite: undefined,
            },
          })
        )
      );
  }

  @Action(RetirerAvantages)
  retirerAvantages(
    ctx: StateContext<MainStore>,
    { payload }: RetirerAvantages
  ) {
    return this.avantagesService
      .retirerAvantage(ctx.getState().selectedSalarie.id, payload)
      .pipe(tap((res) => ctx.patchState({ selectedSalarie: res })));
  }

  @Action(SupprimerAvantage)
  supprimerAvantage(ctx: StateContext<MainStore>, { id }: SupprimerAvantage) {
    return this.avantagesService.supprimer(id).pipe(
      tap(() => {
        let avantages = ctx
          .getState()
          .selectedSalarie.avantages.filter((avantage) => avantage.id !== id);
        ctx.patchState({
          selectedSalarie: { ...ctx.getState().selectedSalarie, avantages },
        });
      })
    );
  }

  @Action(ValiderRetraite)
  validerRetraite(ctx: StateContext<MainStore>, { payload }: ValiderRetraite) {
    return this.retraitesService
      .validerRetraite(ctx.getState().selectedSalarie.id, payload)
      .pipe(
        tap((res) =>
          ctx.patchState({
            selectedSalarie: {
              ...ctx.getState().selectedSalarie,
              retraite: res,
            },
          })
        )
      );
  }

  @Action(DeleteSalarie)
  deleteSalarie(ctx: StateContext<MainStore>, { id, payload }: DeleteSalarie) {
    return this.service
      .deleteSalarie(id, { raisonSuppression: payload.raisonSuppression })
      .pipe(
        tap((res) =>
          ctx.setState(
            patch({ salaries: updateItem((item) => item.id === id, res) })
          )
        )
      );
  }

  @Action(RestoreSalarie)
  restoreSalarie(ctx: StateContext<MainStore>, { id }: RestoreSalarie) {
    return this.service
      .restore(id)
      .pipe(
        tap((res) =>
          ctx.setState(
            patch({ salaries: updateItem((item) => item.id === id, res) })
          )
        )
      );
  }

  @Action(RepondreSelectedSalarieAbsence)
  repondreSelectedSalarie(
    ctx: StateContext<MainStore>,
    { id, avis }: RepondreSelectedSalarieAbsence
  ) {
    console.log("Dispatched", "RepondreSelectedSalarieAbsence");
    return this.absencesService.repondre(id, avis).pipe(
      tap((res) => {
        let selectedSalarie: Salarie = this.store.selectSnapshot(
          SalariesState.getSelectedSalarie
        );
        console.log("Selected salarie", selectedSalarie);
        let absences = selectedSalarie.absences;
        absences = absences.map((absence) =>
          absence.id === res.id ? res : absence
        );
        console.log(absences);
        ctx.patchState({ selectedSalarie: { ...selectedSalarie, absences } });
      })
    );
  }
}
