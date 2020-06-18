import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Salarie } from "../../../models/salarie";
import { AbsencesService } from "../../../services/absences.service";
import { MatDialogRef } from "@angular/material";
import { SalariesService } from "../../../services/salaries.service";
import { Select, Store } from "@ngxs/store";
import { AddAbsence } from "src/app/actions/absences.action";
import { Observable } from "rxjs";
import { SalariesState } from "../../../states/salaries.state";
import { HttpEventType } from "@angular/common/http";

@Component({
  selector: "app-absence-form",
  templateUrl: "./absence-form.component.html",
  styleUrls: ["./absence-form.component.css"],
})
export class AbsenceFormComponent implements OnInit {
  absenceForm: FormGroup;

  @Select(SalariesState.getSalaries)
  salaries: Observable<Salarie[]>;
  salariesLoaded: boolean;

  justificatif: File;

  uploadProgress = 0;
  uploading = false;

  types: string[];

  constructor(
    private formBuilder: FormBuilder,
    public dialogRef: MatDialogRef<AbsenceFormComponent>,
    private absenceService: AbsencesService,
    private salariesService: SalariesService,
    private store: Store
  ) {}

  ngOnInit() {
    this.types = ["Décès", "Maladie", "Marriage"];

    this.salariesLoaded = true;

    this.absenceForm = this.formBuilder.group({
      salarieId: ["", Validators.required],
      dateDebut: ["", Validators.required],
      dateFin: ["", Validators.required],
      type: ["", Validators.required],
    });

    this.dialogRef.backdropClick().subscribe((_) => {
      if (!this.absenceForm.dirty) {
        console.log("FORM IS TOUCHED");
        this.dialogRef.close();
      } else {
        if (confirm("Vos données vont être ignorés. Voulez-vous continuez ?")) {
          this.dialogRef.close();
        }
      }
    });
  }

  onSubmit($event) {
    const formData: FormData = new FormData();
    formData.append("salarie_id", this.absenceForm.get("salarieId").value);
    formData.append("dateDebut", this.absenceForm.get("dateDebut").value);
    formData.append("dateFin", this.absenceForm.get("dateFin").value);
    formData.append("type", this.absenceForm.get("type").value);
    if (this.justificatif) {
      formData.append("justificatif", this.justificatif);
    } else {
      formData.append("justificatif", null);
    }

    console.log("BTN EVNT", $event);

    // (data: HttpEvent<any>) => {
    //   console.log(data);
    //   if (data.type === HttpEventType.UploadProgress) {
    //     this.uploading = true;
    //     this.uploadProgress = Math.round(100 * data.loaded / data.total);
    //   } else if (data.type === HttpEventType.Response) {
    //     this.openSnackBar('Photo de profil a été chargée avec succès !');
    //     this.store.dispatch(new ModifyPhoto(data.body));
    //     // this.currentUser = data.body;
    //     this.uploading = false;
    //   }

    $event.target.disabled = true;
    this.absenceService.createAbsence(formData).subscribe(
      (data) => {
        if (data.type === HttpEventType.UploadProgress && this.justificatif) {
          console.log(Math.round((100 * data.loaded) / data.total));
          $event.target.innerText = `Enregistrement en cours (${Math.round(
            (100 * data.loaded) / data.total
          )} %)`;
        } else if (data.type === HttpEventType.Response) {
          this.store
            .dispatch(new AddAbsence(data.body))
            .subscribe(() => this.dialogRef.close());
        }
      },
      (error) => {
        console.log("Error", error);
        alert(error.error.message);
        $event.target.disabled = false;
      }
    );

    // this.store.dispatch(new AddAbsence(formData)).subscribe(() => this.dialogRef.close());
  }

  handleJustificatif($event) {
    this.justificatif = $event.target.files[0];
    console.log(this.justificatif);
  }

  dateFilter = (d: Date | null): boolean => {
    const day = (d || new Date()).getDay();
    // Prevent Saturday and Sunday from being selected.
    return day !== 0 && day !== 6 && d.getTime() <= new Date().getTime();
  };
}
1;
