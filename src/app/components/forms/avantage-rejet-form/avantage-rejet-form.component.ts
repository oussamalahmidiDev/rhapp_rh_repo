import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup } from "@angular/forms";
import { AvantageNature } from "../../../models/avatange";
import { MatDialogRef } from "@angular/material";
import { Salarie } from "../../../models/salarie";
import { Select, Store } from "@ngxs/store";
import { Observable } from "rxjs";
import {
  RetirerAvantages,
  ValiderRetraite,
} from "src/app/actions/salaries.action";
import { SalariesState } from "../../../states/salaries.state";
import { filter, map } from "rxjs/operators";

@Component({
  selector: "app-avantage-rejet-form",
  templateUrl: "./avantage-rejet-form.component.html",
  styleUrls: ["./avantage-rejet-form.component.css"],
})
export class AvantageRejetFormComponent implements OnInit {
  formGroup: FormGroup;

  @Select(SalariesState.getSelectedSalarieAvantages)
  avantages: Observable<AvantageNature[]>;

  @Select(SalariesState.getSelectedSalarie)
  salarie: Observable<Salarie>;

  selectedAvantages: AvantageNature[];

  constructor(
    private formBuilder: FormBuilder,
    public dialogRef: MatDialogRef<AvantageRejetFormComponent>,
    private store: Store
  ) {}

  ngOnInit() {
    this.selectedAvantages = [];
  }

  onSubmit() {
    this.avantages
      .pipe(
        map((avantages) =>
          avantages.filter((avantage) => avantage.retire === false)
        )
      )
      .subscribe((avantages) => {
        if (!avantages.length) {
          alert("Aucun avantage à retirer");
          this.dialogRef.close();
          return;
          // this.store.dispatch(new ValiderRetraite()).subscribe(() => this.dialogRef.close());
        } else {
          if (this.selectedAvantages.length) {
            this.store
              .dispatch(new RetirerAvantages(this.selectedAvantages))
              .subscribe(() => this.dialogRef.close());
          }
        }
      });
  }

  handleCheckboxChange(event, avantage: AvantageNature) {
    if (!event.checked) {
      this.selectedAvantages = this.selectedAvantages.filter(
        (element) => element.id !== avantage.id
      );
    } else {
      this.selectedAvantages.push({ id: avantage.id });
    }
    console.log(this.selectedAvantages);
  }
}
