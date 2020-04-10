import {Component, OnInit, Inject, EventEmitter, Output} from '@angular/core';
import {Validators, FormGroup, FormBuilder, FormArray, FormControl} from '@angular/forms';
import {MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import {Virement} from 'src/app/models/virement';
import {Poste} from 'src/app/models/poste';
import {copyStyles} from '@angular/animations/browser/src/util';
import {SalariesService} from '../../../services/salaries.service';
import {PosteService} from '../../../services/poste.service';

@Component({
  selector: 'app-poste-form',
  templateUrl: './poste-form.component.html',
  styleUrls: ['./poste-form.component.css']
})
export class PosteFormComponent implements OnInit {

  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;


  competences: FormArray;


  constructor(
    private _formBuilder: FormBuilder,
    public dialogRef: MatDialogRef<PosteFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Poste[],
    private salariesService: SalariesService,
    private posteService: PosteService) {
  }


  addCompetence() {
    this.competences = this.secondFormGroup.get('competences') as FormArray;
    this.competences.push(this._formBuilder.group({
      comp: ['']
    }));
    const c = this.competences.value.map(comp => comp.comp);
    console.log(this.competences.value);
    console.log(c);
  }


  submitForm() {
    console.log(this.firstFormGroup, this.secondFormGroup);
    const {comp} = this.competences.value;

    const newPoste: Poste = {
      competences: this.competences.value.map(compentence => compentence.comp),
      direction: this.firstFormGroup.get('direction').value,
      division: this.firstFormGroup.get('division').value,
      nom: this.secondFormGroup.get('posteName').value,
      salarie: undefined,
      service: this.firstFormGroup.get('service').value
    };
    console.log(newPoste);
    this.posteService.postes.push(newPoste);
    this.dialogRef.close(newPoste);
  }


  ngOnInit() {
    console.log(this.data);
    this.firstFormGroup = this._formBuilder.group({
      service: [''],
      division: [''],
      direction: ['']
    });
    this.secondFormGroup = this._formBuilder.group({
      posteName: [''],
      competences: this._formBuilder.array([])
      // competences: ['']
    });

    this.competences = this.secondFormGroup.get('competences') as FormArray;
  }

}
