import { Component, Injectable, OnInit, ViewChild } from "@angular/core";
import { MatDialog, MatSnackBar, MatSort } from "@angular/material";
import { Retraite } from "../../models/retraite";
import { RetraiteFormComponent } from "../forms/retraite-form/retraite-form.component";
import { Salarie } from "../../models/salarie";
import { SalariesService } from "../../services/salaries.service";
import { ActivatedRoute, Router } from "@angular/router";
import { RetraitesService } from "../../services/retraites.service";
import { AvantageRejetFormComponent } from "../forms/avantage-rejet-form/avantage-rejet-form.component";
import { Select, Store } from "@ngxs/store";
import { Observable } from "rxjs";
import {
  ValiderRetraite,
  SupprimerRetraite,
} from "src/app/actions/salaries.action";
import { SalariesState } from "../../states/salaries.state";
import { AvantageNature } from "src/app/models/avatange";

@Injectable()
@Component({
  selector: "app-salarie-retraite",
  templateUrl: "./salarie-retraite.component.html",
  styleUrls: ["./salarie-retraite.component.css"],
})
export class SalarieRetraiteComponent implements OnInit {
  id: number;

  @Select(SalariesState.getSelectedSalarieRetraite)
  retraite: Observable<Retraite>;

  @Select(SalariesState.getSelectedSalarieAvantages)
  avantages: Observable<AvantageNature[]>;

  nombreAvantagesNonRetire = 0;

  salarieLoaded: boolean;

  @Select(SalariesState.getSelectedSalarie)
  salarie: Observable<Salarie>;

  // @ts-ignore
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  constructor(
    private snackBar: MatSnackBar,
    private dialog: MatDialog,
    private salariesService: SalariesService,
    private retraitesService: RetraitesService,
    private router: Router,
    private store: Store
  ) {}

  ngOnInit() {
    this.salarieLoaded = true;
    this.avantages.subscribe((avantages) => {
      console.log("AVANTAGES", avantages);
      this.nombreAvantagesNonRetire = avantages.filter(
        (avantage) => avantage.retire === false
      ).length;
      console.log("AVANTAGES NON RETIR", this.nombreAvantagesNonRetire);
    });
  }

  openSnackBar() {
    this.snackBar.open("Virements ajouté", "OK", {
      duration: 2000,
    });
  }

  openRetraiteFrom(): void {
    const dialogRef = this.dialog.open(RetraiteFormComponent, {
      width: "500px",
    });
    dialogRef.afterClosed().subscribe((data: Retraite) => {
      if (data !== undefined) {
        // console.log("SAVED RETRAITE", data);
        // this.retraite = this.salarie.retraite = data;
        // this.salariesService.emit(this.salarie);
      }
    });
  }

  modifier() {
    const dialogRef = this.dialog.open(RetraiteFormComponent, {
      width: "500px",
      data: this.store.selectSnapshot(SalariesState.getSelectedSalarieRetraite),
    });
    dialogRef.afterClosed().subscribe((data: Retraite) => {
      if (data !== undefined) {
        // console.log("SAVED RETRAITE", data);
        // this.retraite = this.salarie.retraite = data;
        // this.salariesService.emit(this.salarie);
      }
    });
  }

  supprimer() {
    if (confirm("Voulez-vous supprimer définitivement la retraite"))
      this.store.dispatch(
        new SupprimerRetraite(
          this.store.selectSnapshot(SalariesState.getSelectedSalarieRetraite).id
        )
      );
  }

  search($event) {
    const filterValue = (event.target as HTMLInputElement).value;
  }

  retirerAvantages() {
    // this.router.navigateByUrl("../avantages");
    // const salarieSnapshot = this.store.selectSnapshot(
    //   SalariesState.getSelectedSalarie
    // );
    // if (!salarieSnapshot.avantages.length)
    //   if (
    //     confirm(
    //       "Ce salarié n'a aucun avantage en nature. Voulez-vous passer directement à la validation de la retraite ?"
    //     )
    //   )
    //     this.validerRetraite();
    //   else {
    //     const dialogRef = this.dialog.open(AvantageRejetFormComponent, {
    //       width: "500px",
    //       // data: this.salarie
    //     });
    //     // dialogRef.afterClosed().subscribe((data) => {});
    //   }
  }

  validerRetraite() {
    const salarieSnapshot = this.store.selectSnapshot(
      SalariesState.getSelectedSalarie
    );
    let remarques = prompt(
      `Entrez vos remarques sur la retraite de ${salarieSnapshot.nom} ${salarieSnapshot.prenom}`
    );
    if (!remarques) return;
    this.store.dispatch(new ValiderRetraite({ remarques }));
  }
}
