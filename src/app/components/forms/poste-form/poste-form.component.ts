import {Component, OnInit, Inject, EventEmitter, Output} from '@angular/core';
import {Validators, FormGroup, FormBuilder, FormArray, FormControl} from '@angular/forms';
import {MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import {Virement} from 'src/app/models/virement';
import {Poste} from 'src/app/models/poste';
import {copyStyles} from '@angular/animations/browser/src/util';
import {SalariesService} from '../../../services/salaries.service';
import {PosteService} from '../../../services/poste.service';
import { Service } from 'src/app/models/service';
import { Direction } from 'src/app/models/direction';

@Component({
  selector: 'app-poste-form',
  templateUrl: './poste-form.component.html',
  styleUrls: ['./poste-form.component.css']
})
export class PosteFormComponent implements OnInit {

  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;

  services: Service[];
  directions: Direction[];

  selectedDirection: Direction;
  selectedService: Service;

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

  handleDirectionSelect(direction: Direction) {
    this.selectedDirection = { id: direction.id, nom: direction.nom };
    console.log("SELECTED", this.selectedDirection);
    this.firstFormGroup.patchValue({
      direction: this.selectedDirection.nom
    });
  }

  handleDirectionChange() {
    this.selectedDirection = {
      id: null,
      nom: this.firstFormGroup.get('direction').value
    }
    console.log("CHANGED", this.selectedDirection);
  }

  handleServiceSelect(service: Service) {
    this.selectedService = { id: service.id, nom: service.nom };
    console.log("SELECTED", this.selectedService);
    this.firstFormGroup.patchValue({
      service: this.selectedService.nom
    });
  }

  handleServiceChange() {
    this.selectedService = {
      id: null,
      nom: this.firstFormGroup.get('service').value
    }
    console.log("CHANGED", this.selectedService);
  }


  submitForm() {
    console.log(this.firstFormGroup, this.secondFormGroup, this.selectedDirection);

    const {comp} = this.competences.value;

    const newPoste: Poste = {
      competences: this.competences.value.map(compentence => compentence.comp),
      direction: this.selectedDirection,
      division: this.firstFormGroup.get('division').value,
      nom: this.secondFormGroup.get('posteName').value,
      service: this.selectedService
    };
    console.log(newPoste);
    this.posteService.createPoste(newPoste).subscribe(
      data => {
        console.log(data);
        this.dialogRef.close(data);
      },
      error => console.log(error)
    );
    // this.posteService.postes.push(newPoste);
  }


  ngOnInit() {
    this.posteService.getServices().subscribe(
      data => this.services = data
    );
    this.posteService.getDirections().subscribe(
      data => this.directions = data
    );

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
