import { Component, Inject, OnInit } from "@angular/core";
import { Service } from "../../../models/service";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material";
import { Direction } from "../../../models/direction";
import { Salarie } from "../../../models/salarie";
import { Select, Store } from "@ngxs/store";
import { AddSalarie, ModifierSalarie } from "src/app/actions/salaries.action";
import { ServicesState } from "../../../states/services.state";
import { Observable } from "rxjs";
import { DirectionsState } from "../../../states/directions.state";

@Component({
  selector: "app-salarie-form",
  templateUrl: "./salarie-form.component.html",
  styleUrls: ["./salarie-form.component.css"],
})
export class SalarieFormComponent implements OnInit {
  editForm = false;

  @Select(ServicesState.getServices)
  services: Observable<Service[]>;

  @Select(DirectionsState.getDirections)
  directions: Observable<Direction[]>;

  selectedDirection: Direction;
  selectedService: Service;

  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;
  thirdFormGroup: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private store: Store,
    @Inject(MAT_DIALOG_DATA) public data: Salarie,
    public dialogRef: MatDialogRef<SalarieFormComponent>
  ) {}

  ngOnInit() {
    this.firstFormGroup = this.formBuilder.group({
      service: ["", Validators.required],
      direction: ["", Validators.required],
      numSomme: ["", Validators.required],
    });

    this.secondFormGroup = this.formBuilder.group({
      nom: ["", Validators.required],
      prenom: ["", Validators.required],
      email: ["", [Validators.required, Validators.email]],
      dateNaissance: ["", Validators.required],
    });

    this.thirdFormGroup = this.formBuilder.group({
      dateRecrutement: ["", Validators.required],
      solde: ["", [Validators.required, Validators.min(1)]],
    });

    if (this.data) {
      this.editForm = true;
      this.firstFormGroup.patchValue({ ...this.data });
      this.secondFormGroup.patchValue({ ...this.data });
      this.thirdFormGroup.patchValue({ ...this.data });

      this.secondFormGroup.patchValue({
        dateNaissance: new Date(this.data.dateNaissance)
          .toISOString()
          .substring(0, 10),
      });
      this.thirdFormGroup.patchValue({
        dateRecrutement: new Date(this.data.dateRecrutement)
          .toISOString()
          .substring(0, 10),
      });
      console.log(this.secondFormGroup.value);
    }

    this.dialogRef.backdropClick().subscribe(() => {
      if (
        this.firstFormGroup.dirty ||
        this.secondFormGroup.dirty ||
        this.thirdFormGroup.dirty
      ) {
        if (confirm("Voulez vous fermer le formulaire ?")) {
          this.dialogRef.close();
        }
      } else {
        this.dialogRef.close();
      }
    });
  }

  handleDirectionSelect(direction: Direction) {
    this.selectedDirection = { id: direction.id, nom: direction.nom };
    console.log("SELECTED", this.selectedDirection);
    this.firstFormGroup.patchValue({
      direction: this.selectedDirection.nom,
    });
  }

  handleDirectionChange() {
    this.selectedDirection = {
      id: null,
      nom: this.firstFormGroup.get("direction").value,
    };
    console.log("CHANGED", this.selectedDirection);
  }

  handleServiceSelect(service: Service) {
    this.selectedService = { id: service.id, nom: service.nom };
    console.log("SELECTED", this.selectedService);
    this.firstFormGroup.patchValue({
      service: this.selectedService.nom,
    });
  }

  handleServiceChange() {
    this.selectedService = {
      id: null,
      nom: this.firstFormGroup.get("service").value,
    };
    console.log("CHANGED", this.selectedService);
  }

  onSubmit() {
    const salarie: Salarie = {
      nom: this.secondFormGroup.value.nom,
      prenom: this.secondFormGroup.value.prenom,
      email: this.secondFormGroup.value.email,
      dateNaissance: this.secondFormGroup.value.dateNaissance,
      numSomme: this.firstFormGroup.value.numSomme,
      direction: this.firstFormGroup.value.direction,
      service: this.firstFormGroup.value.service,
      solde: this.thirdFormGroup.value.solde,
      dateRecrutement: this.thirdFormGroup.value.dateRecrutement,
    };
    console.log("FINAL SALARIE :", salarie);
    if (!this.editForm) {
      this.store.dispatch(new AddSalarie(salarie)).subscribe(
        () => this.dialogRef.close(),
        (err) => alert(err.error.message)
      );
    } else {
      this.store.dispatch(new ModifierSalarie(this.data.id, salarie)).subscribe(
        () => this.dialogRef.close(),
        (err) => alert(err.error.message)
      );
    }
  }

  showNom(element: Direction | Service) {
    return element ? element.nom : element;
  }

  dateFilter = (d: Date | null): boolean => {
    const date = d || new Date();
    return date.getTime() <= new Date().getTime();
  };
}
