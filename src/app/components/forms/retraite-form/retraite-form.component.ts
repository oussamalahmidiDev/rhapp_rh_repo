import {Component, Inject, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';

import {Salarie} from '../../../models/salarie';
import {SalariesService} from '../../../services/salaries.service';
import {Retraite} from '../../../models/retraite';
import {RetraitesService} from '../../../services/retraites.service';

@Component({
  selector: 'app-retraite-form',
  templateUrl: './retraite-form.component.html',
  styleUrls: ['./retraite-form.component.css']
})
export class RetraiteFormComponent implements OnInit {

  isLinear = false;

  formGroup: FormGroup;

  typesRetraite: any[];

  salaries: Salarie[] = this.salariesService.salaries;


  constructor(
    private _formBuilder: FormBuilder,
    public dialogRef: MatDialogRef<RetraiteFormComponent>,
    @Inject(MAT_DIALOG_DATA) public retraite: Retraite,
    private retraiteService: RetraitesService,
    private salariesService: SalariesService) {
  }

  ngOnInit() {
    console.log('RETRAITE DATA', this.retraite);
    this.typesRetraite = [
      {id: 1, typeRetraite: 'A'},
      {id: 2, typeRetraite: 'B'},
      {id: 3, typeRetraite: 'C'},
    ];

    this.retraiteService.getRetraitesType().subscribe(
      data => this.typesRetraite = data
    );

    this.formGroup = this._formBuilder.group({
      dateRetraite: [this.retraite.dateRetraite, Validators.required],
      reference: [this.retraite.reference, Validators.required],
      remarques: [this.retraite.remarques, Validators.required],
      type: [this.retraite.type.typeRetraite, Validators.required]
    });


  }

  onSubmit() {
    console.log(this.formGroup);
    this.retraite.dateRetraite = this.formGroup.value.dateRetraite;
    this.retraite.reference = this.formGroup.value.reference;
    this.retraite.remarques = this.formGroup.value.remarques;
    this.retraite.type = this.formGroup.value.type.id ? this.formGroup.value.type : {id: null, typeRetraite: this.formGroup.value.type};

    console.log('RETRAITE = ', this.retraite);

    this.retraiteService.createRetraite(this.retraite).subscribe(
      data => this.dialogRef.close(data),
      error => console.log(error.error)
    );

  }

  showType(type: any) {
    let k = type ? type.typeRetraite : type;
    return k;
  }
}
