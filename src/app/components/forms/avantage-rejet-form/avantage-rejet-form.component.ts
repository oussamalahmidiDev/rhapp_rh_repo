import {Component, Inject, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {AvantageNature} from '../../../models/avatange';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {Salarie} from '../../../models/salarie';
import {AvantagesService} from '../../../services/avantages.service';
import {SalariesService} from '../../../services/salaries.service';

@Component({
  selector: 'app-avantage-rejet-form',
  templateUrl: './avantage-rejet-form.component.html',
  styleUrls: ['./avantage-rejet-form.component.css']
})
export class AvantageRejetFormComponent implements OnInit {

  formGroup: FormGroup;

  avantages: AvantageNature[];

  selectedAvantages: AvantageNature[];

  constructor(
    private _formBuilder: FormBuilder,
    public dialogRef: MatDialogRef<AvantageRejetFormComponent>,
    @Inject(MAT_DIALOG_DATA) public salarie: Salarie,
    private salariesService: SalariesService,
    private service: AvantagesService) {
  }

  ngOnInit() {
    this.selectedAvantages = [];
    this.avantages = this.salarie.avantages;
  }



  onSubmit() {
    if (this.selectedAvantages.length) {
      this.service.retirerAvantage(this.salarie.id, this.selectedAvantages).subscribe(
        data => {
          this.salariesService.emit(data);
          this.dialogRef.close(data);
        },
        error => console.log(error.error)
      );
    }
  }

  handleCheckboxChange(event, avantage: AvantageNature) {
    if (!event.checked) {
      this.selectedAvantages = this.selectedAvantages.filter(element => element.id !== avantage.id);
    } else {
      this.selectedAvantages.push(avantage);
    }
    console.log(this.selectedAvantages);

  }
}
