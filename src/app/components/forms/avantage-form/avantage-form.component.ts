import {Component, Inject, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Salarie} from '../../../models/salarie';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {RetraitesService} from '../../../services/retraites.service';
import {SalariesService} from '../../../services/salaries.service';
import {AvantageNature} from '../../../models/avatange';
import {AvantagesService} from '../../../services/avantages.service';

@Component({
  selector: 'app-avantage-form',
  templateUrl: './avantage-form.component.html',
  styleUrls: ['./avantage-form.component.css']
})
export class AvantageFormComponent implements OnInit {

  typesAvantage: any[];
  formGroup: FormGroup;

  constructor(private _formBuilder: FormBuilder,
              public dialogRef: MatDialogRef<AvantageFormComponent>,
              @Inject(MAT_DIALOG_DATA) public salarie: Salarie,
              private avantageService: AvantagesService,
              private salariesService: SalariesService) {
  }

  ngOnInit() {
    console.log('AV DATA', this.salarie);

    this.avantageService.getAvantageTypes().subscribe(
      data => this.typesAvantage = data
    );

    this.formGroup = this._formBuilder.group({
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
    this.avantageService.createAvantage(this.salarie.id, newAvantage).subscribe(
      data => this.dialogRef.close(data),
      error => console.log(error.error)
    );
  }

  showType(type: any) {
    let k = type ? type.typeAvantage : type;
    return k;
  }
}
