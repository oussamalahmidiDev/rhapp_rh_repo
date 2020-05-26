import {Component, Inject, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';

import {Conge} from '../../../models/conge';

import {CongesService} from '../../../services/conges.service';

@Component({
  selector: 'app-conge-reponse-form',
  templateUrl: './conge-reponse-form.component.html',
  styleUrls: ['./conge-reponse-form.component.css']
})
export class CongeReponseFormComponent implements OnInit {


  congeReponseForm: FormGroup;


  competences: string[] = [];


  constructor(
    private formBuilder: FormBuilder,
    public dialogRef: MatDialogRef<CongeReponseFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Conge,
    private congeService: CongesService) {
    console.log(data);
  }

  ngOnInit() {
    this.congeReponseForm = this.formBuilder.group({
      reponse: [''],
      etat: ['']
    });
  }

  onSubmit() {
    console.log(this.congeReponseForm.value);
    this.congeService.repondreConge(this.data.id, this.congeReponseForm.value).subscribe(
      data => this.dialogRef.close(data),
      error => {
      }
    );
  }

}
