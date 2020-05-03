import {Component, OnInit, Inject, EventEmitter, Output} from '@angular/core';
import {Validators, FormGroup, FormBuilder} from '@angular/forms';
import {MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import {Virement} from 'src/app/models/virement';
import {Poste} from 'src/app/models/poste';
import {copyStyles} from '@angular/animations/browser/src/util';
import {Salarie} from 'src/app/models/salarie';
import {SalariesService} from '../../../services/salaries.service';

@Component({
  selector: 'app-retraite-form',
  templateUrl: './retraite-form.component.html',
  styleUrls: ['./retraite-form.component.css']
})
export class RetraiteFormComponent implements OnInit {

  isLinear = false;
  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;
  formIsValid = false;
  formIsApproved = false;

  compteExp: string = '';
  compteDest: string = '';
  montant: string = '';

  salaries: Salarie[] = this.salariesService.salaries;

  competences: string[] = [];
  poste: Poste;

  constructor(private _formBuilder: FormBuilder, public dialogRef: MatDialogRef<RetraiteFormComponent>, @Inject(MAT_DIALOG_DATA) public data: Poste[], private salariesService: SalariesService) {
  }

  createVirement() {
    const newVirement: Virement = {
      id: '1',
      compteExp: this.compteExp,
      compteDest: this.compteDest,
      montant: this.montant,
      dateOperation: new Date().toString().substr(0, 15),
      statut: 'PENDING'
    };

    this.formIsValid = true;
    // console.log
    this.dialogRef.close(newVirement);
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
