import { Component, Injectable, OnInit, ViewChild } from "@angular/core";
import {
  MatDialog,
  MatSnackBar,
  MatSort,
  MatTableDataSource,
} from "@angular/material";
import { Absence } from "../../models/absence";
import { SalariesService } from "../../services/salaries.service";
import { AbsencesService } from "../../services/absences.service";
import { AbsenceFormComponent } from "../forms/absence-form/absence-form.component";
import { ActivatedRoute } from "@angular/router";
import { Select, Store } from "@ngxs/store";
import { AbsencesState } from "src/app/states/absences.state";
import { Observable } from "rxjs";
import { GetSalaries } from "src/app/actions/salaries.action";
import {
  DeleteAbsence,
  GetAbsences,
  RepondreAbsence,
} from "src/app/actions/absences.action";
import { DownloadService } from "../../services/download.service";

import { saveAs } from "file-saver";
import { HttpEvent, HttpEventType } from "@angular/common/http";
import { GetConges } from "src/app/actions/conges.action";

@Injectable()
@Component({
  selector: "app-absences",
  templateUrl: "./absences.component.html",
  styleUrls: ["./absences.component.css"],
})
export class AbsencesComponent implements OnInit {
  @Select(AbsencesState.getAbsences)
  absences: Observable<Absence[]>;

  absencesDs: MatTableDataSource<Absence>;
  absenceCols: string[] = [
    "salarie",
    "datedebut",
    "datefin",
    "type",
    "justificatif",
    "actions",
  ];

  // @ts-ignore
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  constructor(
    private absencesService: AbsencesService,
    private snackBar: MatSnackBar,
    private dialog: MatDialog,
    private salariesService: SalariesService,
    private activatedRoute: ActivatedRoute,
    private store: Store,
    private downloadService: DownloadService
  ) {}

  ngOnInit() {
    this.absences.subscribe((data) => {
      this.absencesDs = new MatTableDataSource<Absence>(data);
      this.absencesDs.filterPredicate = (data: any, filter) => {
        const dataStr = JSON.stringify(data).toLowerCase();
        return dataStr.indexOf(filter) !== -1;
      };
    });
    this.store
      .dispatch(new GetAbsences())
      .subscribe(() =>
        this.store
          .dispatch(new GetSalaries())
          .subscribe(() => this.store.dispatch(new GetConges()))
      );
  }

  openSnackBar(message: string) {
    this.snackBar.open(message, "OK", {
      duration: 2000,
    });
  }

  openAbsenceForm() {
    const dialogRef = this.dialog.open(AbsenceFormComponent, {
      width: "500px",
      disableClose: true,
    });
    dialogRef.afterClosed().subscribe((data) => {
      if (data) this.openSnackBar(`L'absence a été enregistré`);
    });
  }

  search($event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.absencesDs.filter = filterValue.trim().toLowerCase();
  }

  handleDownload($event, url: string, name: string) {
    if ($event.target.hasAttribute("state")) {
      return;
    }
    const innerText = $event.target.innerText;
    this.downloadService
      .handleDownload(url)
      .subscribe((data: HttpEvent<any>) => {
        if (
          data.type === HttpEventType.DownloadProgress ||
          data.type === HttpEventType.UploadProgress
        ) {
          $event.target.innerText = `Télechargement en cours (${Math.round(
            (100 * data.loaded) / data.total
          )} %)`;
          $event.target.setAttribute("state", "downloading");
        } else if (data.type === HttpEventType.Response) {
          console.log(data);
          $event.target.innerText = innerText;
          $event.target.disabled = false;
          $event.target.removeAttribute("state");
          const blob = new Blob([data.body], { type: data.body.type });
          saveAs(blob, name);
        }
      });
  }

  repondre(absence: Absence, avis: string) {
    this.store.dispatch(new RepondreAbsence(absence.id, avis));
  }

  deleteAbsence(absence: Absence) {
    // if (confirm(`Voulez-vous supprimer le poste de ${poste.nom}`)) {
    this.store.dispatch(new DeleteAbsence(absence.id));
    // }
  }
}
