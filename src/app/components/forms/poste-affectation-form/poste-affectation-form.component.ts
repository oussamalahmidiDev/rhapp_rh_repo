import { Component, Inject, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material";
import { Poste } from "../../../models/poste";
import { PosteService } from "../../../services/poste.service";
import { Salarie } from "../../../models/salarie";
import { Select, Store } from "@ngxs/store";
import { Observable } from "rxjs";
import { AffecterSalarie } from "src/app/actions/postes.action";
import { SalariesState } from "../../../states/salaries.state";

@Component({
  selector: "app-poste-affectation-form",
  templateUrl: "./poste-affectation-form.component.html",
  styleUrls: ["./poste-affectation-form.component.css"],
})
export class PosteAffectationFormComponent implements OnInit {
  affectationForm: FormGroup;

  @Select(SalariesState.nonRetiredSalaries)
  salaries: Observable<Salarie[]>;
  salariesLoaded: boolean;

  constructor(
    private formBuilder: FormBuilder,
    public dialogRef: MatDialogRef<PosteAffectationFormComponent>,
    @Inject(MAT_DIALOG_DATA) public poste: Poste,
    private posteService: PosteService,
    private store: Store
  ) {}

  ngOnInit() {
    this.salariesLoaded = true;

    this.affectationForm = this.formBuilder.group({
      salarieId: ["", Validators.required],
      fonctions: [""],
    });
  }

  submitForm() {
    console.log(this.affectationForm);
    this.store
      .dispatch(new AffecterSalarie(this.poste.id, this.affectationForm.value))
      .subscribe(() => this.dialogRef.close());
  }
}
