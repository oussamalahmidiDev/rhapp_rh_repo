import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {MatDialogRef} from '@angular/material';

import {Salarie} from '../../../models/salarie';
import {Retraite} from '../../../models/retraite';
import {RetraitesService} from '../../../services/retraites.service';
import {Select, Store} from '@ngxs/store';
import {AddRetraite} from 'src/app/actions/salaries.action';
import {Observable} from 'rxjs';
import {SalariesState} from '../../../states/salaries.state';

@Component({
  selector: 'app-retraite-form',
  templateUrl: './retraite-form.component.html',
  styleUrls: ['./retraite-form.component.css']
})
export class RetraiteFormComponent implements OnInit {

  formGroup: FormGroup;

  typesRetraite: any[];

  @Select(SalariesState.getSelectedSalarie)
  salarie: Observable<Salarie>;


  constructor(
    private formBuilder: FormBuilder,
    public dialogRef: MatDialogRef<RetraiteFormComponent>,
    private retraiteService: RetraitesService,
    private store: Store,
  ) {
  }

  ngOnInit() {
    this.typesRetraite = [
      {id: 1, typeRetraite: 'A'},
      {id: 2, typeRetraite: 'B'},
      {id: 3, typeRetraite: 'C'},
    ];

    this.retraiteService.getRetraitesType().subscribe(
      data => this.typesRetraite = data
    );

    this.formGroup = this.formBuilder.group({
      dateRetraite: ['', Validators.required],
      reference: ['', Validators.required],
      remarques: ['', Validators.required],
      type: ['', Validators.required]
    });


  }

  onSubmit() {
    console.log(this.formGroup);
    const retraite: Retraite = this.formGroup.value;
    retraite.salarie = {...retraite.salarie, id: this.store.selectSnapshot(SalariesState.getSelectedSalarie).id};
    retraite.type = this.formGroup.value.type.id ? this.formGroup.value.type : {id: null, typeRetraite: this.formGroup.value.type};


    this.store.dispatch(new AddRetraite(retraite)).subscribe(
      data => {
        console.log(data);
        this.dialogRef.close();
      }
    );

  }

  showType(type: any) {
    return type ? type.typeRetraite : type;
  }
}
