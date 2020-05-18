import {Component, OnInit, Inject, EventEmitter, Output} from '@angular/core';
import {Validators, FormGroup, FormBuilder} from '@angular/forms';
import {MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import {Poste} from '../../../models/poste';

import {SalariesService} from '../../../services/salaries.service';

@Component({
  selector: 'app-conge-form',
  templateUrl: './conge-form.component.html',
  styleUrls: ['./conge-form.component.css']
})
export class CongeFormComponent implements OnInit {

  isLinear = false;
  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;
  formIsValid = false;
  formIsApproved = false;

  compteExp: string = '';
  compteDest: string = '';
  montant: string = '';

  competences: string[] = [];

  poste: Poste;

  constructor(private _formBuilder: FormBuilder, public dialogRef: MatDialogRef<CongeFormComponent>, @Inject(MAT_DIALOG_DATA) public data: Poste[], private salariesService: SalariesService) {
  }


  addCompetence($event) {
    event.preventDefault();
    this.competences = this.competences.filter(comp => comp !== '');
    this.competences.push('');
    console.log(this.competences);
  }

  createPoste() {
    this.formIsValid = true;
    this.dialogRef.close(this.poste);

  }

  ngOnInit() {
    console.log(this.data);
    this.firstFormGroup = this._formBuilder.group({
      firstCtrl: ['', Validators.required]
    });
    this.secondFormGroup = this._formBuilder.group({
      secondCtrl: ['', Validators.required]
    });
  }

}
