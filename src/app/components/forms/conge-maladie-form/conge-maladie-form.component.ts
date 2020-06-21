import { Component, Inject, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Salarie } from "../../../models/salarie";
import { CongesService } from "../../../services/conges.service";
import { SalariesService } from "../../../services/salaries.service";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material";
import { AbsenceFormComponent } from "../absence-form/absence-form.component";
import { CongeMaladieRequest } from "../../../models/congeMaladieRequest";
import { Select, Store } from "@ngxs/store";
import { AddCongeMaladie, ModifierConge } from "src/app/actions/conges.action";
import { Observable } from "rxjs";
import { SalariesState } from "../../../states/salaries.state";
import { Conge } from "src/app/models/conge";
import * as moment from "moment";
import { Absence } from "src/app/models/absence";
import { AbsencesState } from "src/app/states/absences.state";
import { CongesState } from "src/app/states/conges.state";

@Component({
  selector: "app-conge-maladie-form",
  templateUrl: "./conge-maladie-form.component.html",
  styleUrls: ["./conge-maladie-form.component.css"],
})
export class CongeMaladieFormComponent implements OnInit {
  congeMaladieForm: FormGroup;

  editForm = false;

  selectedSalarieAbsences: Absence[] = [];
  selectedSalarieConges: Conge[] = [];

  @Select(SalariesState.getSalaries)
  salaries: Observable<Salarie[]>;
  salariesLoaded: boolean;

  constructor(
    private formBuilder: FormBuilder,
    public dialogRef: MatDialogRef<AbsenceFormComponent>,
    private congeService: CongesService,
    @Inject(MAT_DIALOG_DATA) public data: Conge,
    private salariesService: SalariesService,
    private store: Store
  ) {}

  ngOnInit() {
    this.salariesLoaded = true;

    this.congeMaladieForm = this.formBuilder.group({
      salarieId: ["", Validators.required],
      dateDebut: ["", Validators.required],
      dateFin: ["", Validators.required],
      motif: ["", Validators.required],
    });

    if (this.data) {
      this.editForm = true;
      this.congeMaladieForm.get("salarieId");
      this.congeMaladieForm.patchValue({
        salarieId: this.data.salarie.id,
        ...this.data,
        dateDebut: new Date(this.data.dateDebut || new Date())
          .toISOString()
          .substring(0, 10),
        dateFin: new Date(this.data.dateFin || new Date())
          .toISOString()
          .substring(0, 10),
      });

      this.selectedSalarieAbsences = this.data.salarie.absences;
      this.selectedSalarieConges = this.data.salarie.conges;

      // if (this.data && this.data.id === undefined) {
      //   this.editForm = false;
      // }
      console.log(this.data);
    }

    this.congeMaladieForm.get("salarieId").valueChanges.subscribe((value) => {
      if (this.store.selectSnapshot(AbsencesState.getAbsences))
        this.selectedSalarieAbsences = this.store
          .selectSnapshot(AbsencesState.getAbsences)
          .filter((absence) => absence.salarie.id === value);
      if (this.store.selectSnapshot(CongesState.getConges))
        this.selectedSalarieConges = this.store
          .selectSnapshot(CongesState.getConges)
          .concat(this.store.selectSnapshot(CongesState.getCongesMaladie))
          .filter(
            (conge) => conge.salarie.id === value && conge.etat === "ACCEPTED"
          );
      this.congeMaladieForm.patchValue({
        dateDebut: "",
        dateFin: "",
      });
    });

    this.dialogRef.backdropClick().subscribe((_) => {
      if (!this.congeMaladieForm.dirty) {
        console.log("FORM IS TOUCHED");
        this.dialogRef.close();
      } else {
        if (confirm("Vos données vont être ignorés. Voulez-vous continuez ?")) {
          this.dialogRef.close();
        }
      }
    });
  }

  checkDates(date: any) {
    return (
      this.selectedSalarieAbsences
        .map(
          (absence) =>
            moment(date).isBefore(absence.dateDebut) ||
            moment(date).isAfter(absence.dateFin)
        )
        .every((boolean) => boolean) &&
      this.selectedSalarieConges
        .map(
          (conge) =>
            moment(date).isBefore(conge.dateDebut) ||
            moment(date).isAfter(conge.dateFin)
        )
        .every((boolean) => boolean)
    );
  }

  dateFilter = (d: Date | null): boolean => {
    return this.checkDates(d);
  };

  onSubmit() {
    const congeMaladie: CongeMaladieRequest = this.congeMaladieForm.value;
    if (!this.editForm || !this.data.id) {
      this.store.dispatch(new AddCongeMaladie(congeMaladie)).subscribe(
        (data) => this.dialogRef.close(data),
        (error) => alert(error.error.message)
      );
    } else {
      this.store
        .dispatch(
          new ModifierConge(this.data.id, {
            ...congeMaladie,
            type: this.data.type,
          })
        )
        .subscribe(
          (data) => this.dialogRef.close(data),
          (error) => alert(error.error.message)
        );
    }
  }

  dateFinFilter = (d: Date | null): boolean => {
    const dateDebut = this.congeMaladieForm.get("dateDebut").value;
    console.log("Selected date debut", dateDebut);
    const absenceApresDateDebut = this.selectedSalarieAbsences.filter(
      (absence) => moment(dateDebut).isBefore(absence.dateDebut)
    )[0];
    console.log("Absences after date", absenceApresDateDebut);

    const congeApresDateDebut = this.selectedSalarieConges.filter((conge) =>
      moment(dateDebut).isBefore(moment(conge.dateDebut))
    )[0];
    console.log("Conges after date", congeApresDateDebut);

    return (
      this.dateFilter(d) &&
      (absenceApresDateDebut
        ? moment(d).isBefore(absenceApresDateDebut.dateDebut)
        : true) &&
      (congeApresDateDebut
        ? moment(d).isBefore(congeApresDateDebut.dateDebut)
        : true)
    );
  };
}
