import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { PosteFormComponent } from '../poste-form/poste-form.component';
import { Poste } from 'src/app/models/poste';
import { SalariesService } from 'src/app/services/salaries.service';
import { PosteService } from 'src/app/services/poste.service';
import { Salarie } from 'src/app/models/salarie';
import { AffectationRequest } from 'src/app/models/affectationRequest';

@Component({
  selector: 'app-poste-affectation-form',
  templateUrl: './poste-affectation-form.component.html',
  styleUrls: ['./poste-affectation-form.component.css']
})
export class PosteAffectationFormComponent implements OnInit {

  affectationForm: FormGroup;

  salaries: Salarie[];
  selectedSalarie: Salarie;
  salariesLoaded: boolean;

  constructor(
    private _formBuilder: FormBuilder,
    public dialogRef: MatDialogRef<PosteAffectationFormComponent>,
    @Inject(MAT_DIALOG_DATA) public poste: Poste,
    private posteService: PosteService,
    private salariesService: SalariesService
  ) {
  }

  ngOnInit() {
    this.salariesLoaded = false;
    this.salariesService.getSalaries()
    .subscribe(data => {
      this.salaries = data;
      this.salariesLoaded = true;
    });

    this.affectationForm = this._formBuilder.group({
      salarieId: ['', Validators.required],
      fonctions: ['']
    });
  }

  submitForm() {
    console.log(this.affectationForm);
    this.posteService.affecterSalarie(this.poste.id, this.affectationForm.value)
    .subscribe(
      data => {
        this.dialogRef.close(data);
      }
    );
  }
}
