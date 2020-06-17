import { Component, Injectable, OnInit, ViewChild } from "@angular/core";
import {
  MatDialog,
  MatSnackBar,
  MatSort,
  MatTableDataSource,
} from "@angular/material";
import { Conge } from "../../models/conge";
import { CongeReponseFormComponent } from "../forms/conge-reponse-form/conge-reponse-form.component";
import { SalariesService } from "../../services/salaries.service";
import { CongesService } from "../../services/conges.service";
import { CongeMaladieFormComponent } from "../forms/conge-maladie-form/conge-maladie-form.component";
import { ActivatedRoute } from "@angular/router";
import { Select, Store } from "@ngxs/store";
import { CongesState } from "src/app/states/conges.state";
import { Observable } from "rxjs";
import { GetSalaries } from "src/app/actions/salaries.action";
import {
  GetConges,
  ChangeParametres,
  GetParametres,
} from "src/app/actions/conges.action";
import { ProfileState } from "src/app/states/profile.state";
import { User } from "src/app/models/user";

@Injectable()
@Component({
  selector: "app-conges",
  templateUrl: "./conges.component.html",
  styleUrls: ["./conges.component.css"],
})
export class CongesComponent implements OnInit {
  @Select(ProfileState.getProfile)
  profile: Observable<User>;

  @Select(CongesState.getConges)
  conges: Observable<Conge[]>;
  congesDs: MatTableDataSource<Conge>;
  congeCols: string[] = [
    "salarie",
    "motif",
    "type",
    "datedebut",
    "datefin",
    "etat",
    "actions",
  ];

  @Select((store) => store.conges.parametres)
  parametres: Observable<any>;

  @Select(CongesState.getCongesMaladie)
  congesMaladie: Observable<Conge[]>;
  congesMaladiesDs: MatTableDataSource<Conge>;
  congeMaladieCols: string[] = [
    "salarie",
    "motif",
    "datedebut",
    "datefin",
    "actions",
  ];
  // @ts-ignore
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  constructor(
    private congesService: CongesService,
    private snackBar: MatSnackBar,
    private dialog: MatDialog,
    private salariesService: SalariesService,
    private activatedRoute: ActivatedRoute,
    private store: Store
  ) {}

  // dataSource: MatTableDataSource < Element[] > ;
  ngOnInit() {
    this.conges.subscribe((data) => {
      this.congesDs = new MatTableDataSource<Conge>(data);
      this.congesDs.filterPredicate = (data: any, filter) => {
        const dataStr = JSON.stringify(data).toLowerCase();
        return dataStr.indexOf(filter) !== -1;
      };
    });

    this.congesMaladie.subscribe((data) => {
      this.congesMaladiesDs = new MatTableDataSource<Conge>(data);
      this.congesMaladiesDs.filterPredicate = (data: any, filter) => {
        const dataStr = JSON.stringify(data).toLowerCase();
        return dataStr.indexOf(filter) !== -1;
      };
    });
    this.store.dispatch(new GetParametres());
    this.store
      .dispatch(new GetConges())
      .subscribe(() => this.store.dispatch(new GetSalaries()));
  }

  openSnackBar(message: string) {
    this.snackBar.open(message, "OK", {
      duration: 2000,
    });
  }

  openCongeMaladieForm() {
    const dialogRef = this.dialog.open(CongeMaladieFormComponent, {
      width: "500px",
      disableClose: true,
    });
    dialogRef.afterClosed().subscribe((data) => {
      if (data !== undefined) {
        console.log("Subtask Dialog output:", data);
        this.openSnackBar(
          `Le congé de maladie de ${data.salarie.nom} a été enregistré`
        );
      }
    });
  }

  openCongeMaladieModifForm(conge: Conge) {
    const dialogRef = this.dialog.open(CongeMaladieFormComponent, {
      width: "500px",
      disableClose: true,
      data: conge,
    });
  }

  openCongeReponseForm(conge: Conge): void {
    const dialogRef = this.dialog.open(CongeReponseFormComponent, {
      width: "460px",
      data: conge,
    });
    dialogRef.afterClosed().subscribe((data) => {
      // if (data !== undefined) {
      //   this.conges = this.conges.map(
      //     conge => {
      //       if (conge.id == data.id) {
      //         return data;
      //       }
      //     }
      //   );
      //   this.congesDs.data = this.conges;
      // }
    });
  }

  search($event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.congesDs.filter = filterValue.trim().toLowerCase();
  }

  changeParametres() {
    let value = prompt(
      "Veuillez entrer le nombre minial de jours de congé (Il doit être supérieur à 18 jours)"
    );
    if (!value) return;

    let nombreMinJoursConge = parseInt(value);
    if (nombreMinJoursConge == undefined || nombreMinJoursConge < 18) {
      alert("Le nombre minimal doit être supérieur à 18 jours");
      return this.changeParametres();
    }

    this.store.dispatch(new ChangeParametres({ nombreMinJoursConge }));
  }
}
