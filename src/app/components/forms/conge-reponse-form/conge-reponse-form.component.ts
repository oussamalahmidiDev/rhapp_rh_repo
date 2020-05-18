import {Component, OnInit, Inject, EventEmitter, Output} from '@angular/core';
import {Validators, FormGroup, FormBuilder} from '@angular/forms';
import {MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';

import {Conge} from '../../../models/conge';

import { CongesService } from '../../../services/conges.service';

@Component({
  selector: 'app-conge-reponse-form',
  templateUrl: './conge-reponse-form.component.html',
  styleUrls: ['./conge-reponse-form.component.css']
})
export class CongeReponseFormComponent implements OnInit {

  isLinear = false;
  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;
  formIsValid = false;
  formIsApproved = false;

  compteExp: string = '';
  compteDest: string = '';
  montant: string = '';

  congeReponseForm: FormGroup;


  competences: string[] = [];
  // poste: Poste = {
  //   nom: "Gestion de RH", direction: "Direction X", division: "Div X", service: "Service RH", competences: ["Cmp 1", "Comp2"], salarie: this.salarie
  // }


  constructor(
    private _formBuilder: FormBuilder,
    public dialogRef: MatDialogRef<CongeReponseFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Conge,
    private congeService: CongesService) {
    console.log(data);
  }

  ngOnInit() {
    this.congeReponseForm = this._formBuilder.group({
      reponse: [''],
      etat: ['']
    });
  }

  onSubmit() {
    console.log(this.congeReponseForm.value);
    this.congeService.repondreConge(this.data.id, this.congeReponseForm.value).subscribe(
      data => this.dialogRef.close(data),
      error => {}
    );
  }

}
