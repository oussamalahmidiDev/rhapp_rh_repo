import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {MatDialogRef} from '@angular/material';


@Component({
  selector: 'app-conge-form',
  templateUrl: './conge-form.component.html',
  styleUrls: ['./conge-form.component.css']
})
export class CongeFormComponent implements OnInit {

  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;
  formIsValid = false;
  formIsApproved = false;


  constructor(
    private formBuilder: FormBuilder,
    public dialogRef: MatDialogRef<CongeFormComponent>
  ) {
  }


  addCompetence($event) {
    event.preventDefault();
  }


  ngOnInit() {
    this.firstFormGroup = this.formBuilder.group({
      firstCtrl: ['', Validators.required]
    });
    this.secondFormGroup = this.formBuilder.group({
      secondCtrl: ['', Validators.required]
    });
  }

}
