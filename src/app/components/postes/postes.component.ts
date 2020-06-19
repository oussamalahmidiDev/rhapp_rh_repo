import { Component, Injectable, OnInit, ViewChild } from "@angular/core";
import {
  MatDialog,
  MatSnackBar,
  MatSort,
  MatTableDataSource,
} from "@angular/material";
import { Poste } from "../../models/poste";
import { PosteFormComponent } from "../forms/poste-form/poste-form.component";
import { PosteAffectationFormComponent } from "../forms/poste-affectation-form/poste-affectation-form.component";
import { ActivatedRoute } from "@angular/router";
import { Select, Store } from "@ngxs/store";
import { PostesState } from "../../states/postes.state";
import { Observable, of } from "rxjs";
import { GetSalaries } from "src/app/actions/salaries.action";
import { GetServices } from "src/app/actions/services.action";
import {
  DeletePoste,
  DeletePosteSalarie,
  GetPostes,
} from "src/app/actions/postes.action";
import { GetDirections } from "src/app/actions/directions.action";
import { map } from "rxjs/operators";
import {
  trigger,
  state,
  style,
  transition,
  animate,
} from "@angular/animations";

@Injectable()
@Component({
  selector: "app-postes",
  templateUrl: "./postes.component.html",
  styleUrls: ["./postes.component.css"],
  animations: [
    trigger("detailExpand", [
      state("collapsed", style({ height: "0px", minHeight: "0" })),
      state("expanded", style({ height: "*" })),
      transition(
        "expanded <=> collapsed",
        animate("225ms cubic-bezier(0.4, 0.0, 0.2, 1)")
      ),
    ]),
  ],
})
export class PostesComponent implements OnInit {
  @Select(PostesState.getPostes)
  postes: Observable<Poste[]>;
  postesDs: MatTableDataSource<Poste>;
  posteCols: string[] = [
    "nom",
    "date",
    "direction",
    "division",
    "service",
    "competences",
    "salarie",
    "actions",
  ];

  expandedPoste: Poste;

  // @ts-ignore
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  constructor(
    private store: Store,
    private dialog: MatDialog,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit() {
    this.postes.subscribe((data) => {
      this.postesDs = new MatTableDataSource<Poste>(data);
    });
    this.store.dispatch(new GetPostes()).subscribe(() => {
      this.store.dispatch(new GetSalaries());
      this.store.dispatch(new GetServices());
      this.store.dispatch(new GetDirections());
    });
  }

  openSnackBar(message: string) {
    this.snackBar.open(message, "OK", {
      duration: 2000,
    });
  }

  openPosteForm(): void {
    this.dialog.open(PosteFormComponent, {
      width: "500px",
    });
  }

  openPosteModifForm(poste: Poste) {
    this.dialog.open(PosteFormComponent, {
      width: "500px",
      data: poste,
    });
  }

  openPosteAffectationForm(poste: Poste): void {
    this.dialog.open(PosteAffectationFormComponent, {
      width: "500px",
      data: poste,
    });
  }

  deleteSelectedSalarie(poste: Poste) {
    if (
      confirm(
        `Voulez vous désaffecter le salarié ${poste.salarie.nom} du poste de ${poste.nom} ?`
      )
    ) {
      this.store.dispatch(new DeletePosteSalarie(poste.id));
      // .pipe(map(() => true));
    }
    // return of(false);
  }

  search($event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.postesDs.filter = filterValue.trim().toLowerCase();
  }

  deletePoste(poste: Poste) {
    if (poste.salarie) {
      if (
        confirm(
          `Ce poste est affecté au salarié ${poste.salarie.prenom} ${poste.salarie.nom}. Voulez-vous continuez ?`
        )
      ) {
        this.store
          .dispatch(new DeletePosteSalarie(poste.id))
          .subscribe(() => this.store.dispatch(new DeletePoste(poste.id)));
      }
    } else {
      if (confirm(`Voulez-vous supprimer le poste de ${poste.nom}`)) {
        this.store.dispatch(new DeletePoste(poste.id));
      }
    }
  }
}
