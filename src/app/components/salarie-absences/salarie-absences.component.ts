import { Component, OnInit } from "@angular/core";
import { Absence } from "../../models/absence";
import { MatTableDataSource, MatDialog } from "@angular/material";
import { Select, Store } from "@ngxs/store";
import { Observable } from "rxjs";
import { SalariesState } from "../../states/salaries.state";
import { DownloadService } from "../../services/download.service";

import { saveAs } from "file-saver";
import { HttpEvent, HttpEventType } from "@angular/common/http";
import { AbsenceFormComponent } from "../forms/absence-form/absence-form.component";
import { GetSalarieById } from "src/app/actions/salaries.action";

@Component({
  selector: "app-salarie-absences",
  templateUrl: "./salarie-absences.component.html",
  styleUrls: ["./salarie-absences.component.css"],
})
export class SalarieAbsencesComponent implements OnInit {
  @Select(SalariesState.getSelectedSalarieAbsences)
  absences: Observable<Absence[]>;
  absencesDs: MatTableDataSource<Absence>;
  absenceCols: string[] = ["datedebut", "datefin", "type", "justificatif"];

  constructor(
    private downloadService: DownloadService,
    private dialog: MatDialog,
    private store: Store
  ) {}

  ngOnInit() {
    this.absences.subscribe((data) => {
      this.absencesDs = new MatTableDataSource<Absence>(data);
      this.absencesDs.filterPredicate = (data: any, filter) => {
        const dataStr = JSON.stringify(data).toLowerCase();
        return dataStr.indexOf(filter) !== -1;
      };
    });
  }

  search($event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.absencesDs.filter = filterValue.trim().toLowerCase();
  }

  openAbsenceForm() {
    const dialogRef = this.dialog.open(AbsenceFormComponent, {
      width: "500px",
      disableClose: true,
      data: {
        salarie: this.store.selectSnapshot(SalariesState.getSelectedSalarie),
      },
    });
    dialogRef.afterClosed().subscribe((data) => {
      if (data !== undefined) {
        this.store.dispatch(
          new GetSalarieById(
            this.store.selectSnapshot(SalariesState.getSelectedSalarie).id
          )
        );
        // this.openSnackBar(`L'absence de  ${data.salarie.nom} a été enregistré`);
      }
    });
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
}
