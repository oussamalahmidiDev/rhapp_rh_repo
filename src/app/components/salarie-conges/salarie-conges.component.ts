import { Component, OnInit } from "@angular/core";
import { Conge } from "../../models/conge";
import { MatDialog, MatSnackBar, MatTableDataSource } from "@angular/material";
import { CongeReponseFormComponent } from "../forms/conge-reponse-form/conge-reponse-form.component";
import { Select, Store } from "@ngxs/store";
import { Observable } from "rxjs";
import { SalariesState } from "../../states/salaries.state";
import * as moment from "moment";
import { DeclarerRetour } from "src/app/actions/conges.action";
import { filter, map } from "rxjs/operators";
import { CongeMaladieFormComponent } from "../forms/conge-maladie-form/conge-maladie-form.component";
import { GetSalarieById } from "src/app/actions/salaries.action";

@Component({
  selector: "app-salarie-conges",
  templateUrl: "./salarie-conges.component.html",
  styleUrls: ["./salarie-conges.component.css"],
})
export class SalarieCongesComponent implements OnInit {
  @Select(SalariesState.getSelectedSalarieConges)
  conges: Observable<Conge[]>;

  congesDs: MatTableDataSource<Conge>;
  congesMaladiesDs: MatTableDataSource<Conge>;
  congeCols: string[] = [
    "motif",
    "type",
    "dateAjt",
    "datedebut",
    "datefin",
    "etat",
    "actions",
  ];

  congeMaladieCols: string[] = ["motif", "dateAjt", "datedebut", "datefin"];

  constructor(
    private snackBar: MatSnackBar,
    private dialog: MatDialog,
    private store: Store
  ) {}

  // dataSource: MatTableDataSource < Element[] > ;
  ngOnInit() {
    this.conges
      .pipe(
        map((conge) =>
          conge.filter((conge) => conge.type.typeConge !== "MALADIE")
        )
      )
      .subscribe((data) => {
        this.congesDs = new MatTableDataSource<Conge>(data);
      });

    this.conges
      .pipe(
        map((conge) =>
          conge.filter((conge) => conge.type.typeConge === "MALADIE")
        )
      )
      .subscribe((data) => {
        this.congesMaladiesDs = new MatTableDataSource<Conge>(data);
      });
  }

  openSnackBar() {
    this.snackBar.open("Virements ajouté", "OK", {
      duration: 2000,
    });
  }

  openCongeMaladieForm() {
    const dialogRef = this.dialog.open(CongeMaladieFormComponent, {
      width: "500px",
      disableClose: true,
      data: {
        salarie: this.store.selectSnapshot(SalariesState.getSelectedSalarie),
      },
    });
    dialogRef.afterClosed().subscribe((data) => {
      if (data) {
        this.store.dispatch(
          new GetSalarieById(
            this.store.selectSnapshot(SalariesState.getSelectedSalarie).id
          )
        );
        console.log("Subtask Dialog output:", data);
      }
    });
  }

  openCongeReponseForm(conge: Conge): void {
    console.log(conge);
    const dialogRef = this.dialog.open(CongeReponseFormComponent, {
      width: "460px",
      data: conge,
    });
    dialogRef.afterClosed().subscribe((data) => {
      if (data !== undefined) {
        // this.conges = this.conges.map(
        //   conge => {
        //     if (conge.id == data.id) {
        //       return data;
        //     }
        //   }
        // );
        // this.congesDs.data = this.conges;
      }
    });
  }

  isCongeAchieved(conge: Conge): boolean {
    return moment(conge.dateFin).isBefore(moment());
  }

  isCongeEnCours(conge: Conge): boolean {
    return (
      moment(conge.dateDebut).isBefore(moment()) &&
      moment(conge.dateFin).isAfter(moment())
    );
  }

  declarerRetour(conge: Conge) {
    this.store.dispatch(new DeclarerRetour(conge));
  }
}
