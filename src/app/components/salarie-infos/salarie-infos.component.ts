import { Component, OnInit } from "@angular/core";
import { Salarie } from "../../models/salarie";
import { Select, Store } from "@ngxs/store";
import { Observable } from "rxjs";
import { SalariesState } from "../../states/salaries.state";
import { DownloadService } from "src/app/services/download.service";
import { HttpEvent, HttpEventType } from "@angular/common/http";
import { saveAs } from "file-saver";
import { environment } from "src/environments/environment";

@Component({
  selector: "app-salarie-infos",
  templateUrl: "./salarie-infos.component.html",
  styleUrls: ["./salarie-infos.component.css"],
})
export class SalarieInfosComponent implements OnInit {
  id: number;

  @Select(SalariesState.getSelectedSalarie)
  salarie: Observable<Salarie>;
  salarieLoaded: boolean;

  constructor(private downloadService: DownloadService, private store: Store) {}

  ngOnInit() {
    this.salarieLoaded = true;
  }

  handleDownload($event, filename: string) {
    if ($event.target.hasAttribute("state")) {
      return;
    }
    const innerText = $event.target.innerText;
    this.downloadService
      .handleDownload(
        `${environment.BASE_URL}/api/salaries/${
          this.store.selectSnapshot(SalariesState.getSelectedSalarie).id
        }/cv/${filename}`
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
          saveAs(blob, filename);
        }
      });
  }
}
