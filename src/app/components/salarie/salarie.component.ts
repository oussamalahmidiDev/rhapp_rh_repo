import { Component, OnInit } from "@angular/core";
import { Salarie } from "../../models/salarie";
import { SalariesService } from "../../services/salaries.service";
import { ActivatedRoute } from "@angular/router";
import { Location } from "@angular/common";
import { Select, Store } from "@ngxs/store";
import { Observable } from "rxjs";
import { DeleteSalariePoste } from "src/app/actions/salaries.action";
import { SalariesState } from "../../states/salaries.state";
import { saveAs } from "file-saver";
import { DownloadService } from "src/app/services/download.service";
import { environment } from "src/environments/environment";
import { HttpEvent, HttpEventType } from "@angular/common/http";

@Component({
  selector: "app-salarie",
  templateUrl: "./salarie.component.html",
  styleUrls: ["./salarie.component.css"],
})
export class SalarieComponent implements OnInit {
  id: number;
  @Select(SalariesState.getSelectedSalarie)
  salarie: Observable<Salarie>;
  salarieLoaded = true;

  constructor(
    private downloadService: DownloadService,
    private route: ActivatedRoute,
    private store: Store,
    private location: Location
  ) {}

  ngOnInit() {}

  deletePoste() {
    this.store.dispatch(new DeleteSalariePoste());
  }

  goBack() {
    this.location.back();
  }

  handleDownload($event) {
    if ($event.target.hasAttribute("state")) {
      return;
    }
    const innerText = $event.target.innerText;
    this.downloadService
      .handleDownload(
        `${environment.BASE_URL}/api/salaries/${
          this.store.selectSnapshot(SalariesState.getSelectedSalarie).id
        }/cv/${this.store.selectSnapshot(SalariesState.getSelectedSalarie).cv}`
      )
      .subscribe((data: HttpEvent<any>) => {
        if (
          data.type === HttpEventType.DownloadProgress ||
          data.type === HttpEventType.UploadProgress
        ) {
          $event.target.innerText = `Télechargement en cours (${Math.round(
            (100 * data.loaded) / data.total
          )} %)`;
          $event.target.setAttribute("state", "downloading");
          $event.target.disabled = true;
        } else if (data.type === HttpEventType.Response) {
          console.log(data);
          $event.target.innerText = innerText;
          $event.target.disabled = false;
          $event.target.removeAttribute("state");
          const blob = new Blob([data.body], { type: data.body.type });
          saveAs(
            blob,
            this.store.selectSnapshot(SalariesState.getSelectedSalarie).cv
          );
        }
      });
  }
}
