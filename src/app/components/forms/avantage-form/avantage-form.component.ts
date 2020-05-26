import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Salarie} from '../../../models/salarie';
import {MatDialogRef} from '@angular/material';
import {AvantageNature} from '../../../models/avatange';
import {AvantagesService} from '../../../services/avantages.service';
import {Observable} from 'rxjs';
import {Select, Store} from '@ngxs/store';
import {AddAvantage} from 'src/app/actions/salaries.action';
import {SalariesState} from '../../../states/salaries.state';

@Component({
  selector: 'app-avantage-form',
  templateUrl: './avantage-form.component.html',
  styleUrls: ['./avantage-form.component.css']
})
export class AvantageFormComponent implements OnInit {

  typesAvantage: any[];
  formGroup: FormGroup;

  @Select(SalariesState.getSelectedSalarie)
  salarie: Observable<Salarie>;

  constructor(private formBuilder: FormBuilder,
              public dialogRef: MatDialogRef<AvantageFormComponent>,
              private store: Store,
              private avantageService: AvantagesService,
  ) {
  }

  ngOnInit() {
    this.avantageService.getAvantageTypes().subscribe(
      data => this.typesAvantage = data
    );

    this.formGroup = this.formBuilder.group({
      commission: ['', Validators.required],
      specification: ['', Validators.required],
      type: ['', Validators.required]
    });

  }

  onSubmit() {
    console.log(this.formGroup);
    const newAvantage: AvantageNature = this.formGroup.value;
    newAvantage.type = this.formGroup.value.type.id ? this.formGroup.value.type : {id: null, typeAvantage: this.formGroup.value.type};
    console.log('SUB', newAvantage);
    this.store.dispatch(new AddAvantage(newAvantage)).subscribe(() => this.dialogRef.close());
  }

  showType(type: any) {
    return type ? type.typeAvantage : type;
  }
}
