import {Component, Inject, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {MAT_DIALOG_DATA, MatChipInputEvent, MatDialogRef} from '@angular/material';
import {Poste} from '../../../models/poste';
import {Service} from '../../../models/service';
import {Direction} from '../../../models/direction';

import {COMMA, ENTER} from '@angular/cdk/keycodes';
import {Select, Store} from '@ngxs/store';
import {CreatePoste} from '../../../actions/postes.action';
import {ServicesState} from 'src/app/states/services.state';
import {Observable} from 'rxjs';
import {DirectionsState} from 'src/app/states/directions.state';

@Component({
  selector: 'app-poste-form',
  templateUrl: './poste-form.component.html',
  styleUrls: ['./poste-form.component.css']
})
export class PosteFormComponent implements OnInit {

  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;

  readonly separatorKeysCodes: number[] = [ENTER, COMMA];

  @Select(ServicesState.getServices)
  services: Observable<Service[]>;

  @Select(DirectionsState.getDirections)
  directions: Observable<Direction[]>;

  selectedDirection: Direction;
  selectedService: Service;

  competences: string[];


  constructor(
    private formBuilder: FormBuilder,
    public dialogRef: MatDialogRef<PosteFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Poste[],
    // private salariesService: SalariesService,
    private store: Store,
  ) {
  }


  addCompetence(event: MatChipInputEvent) {
    const input = event.input;
    const value = event.value;

    // Add competence
    if ((value || '').trim()) {
      this.competences.push(value.trim());
    }

    // Reset the input value
    if (input) {
      input.value = '';
    }
    console.log(this.competences);
  }

  remove(compentence: string): void {
    const index = this.competences.indexOf(compentence);
    if (index >= 0) {
      this.competences.splice(index, 1);
    }
  }

  handleDirectionSelect(direction: Direction) {
    this.selectedDirection = {id: direction.id, nom: direction.nom};
    console.log('SELECTED', this.selectedDirection);
    this.firstFormGroup.patchValue({
      direction: this.selectedDirection.nom
    });
  }

  handleDirectionChange() {
    this.selectedDirection = {
      id: null,
      nom: this.firstFormGroup.get('direction').value
    };
    console.log('CHANGED', this.selectedDirection);
  }

  handleServiceSelect(service: Service) {
    this.selectedService = {id: service.id, nom: service.nom};
    console.log('SELECTED', this.selectedService);
    this.firstFormGroup.patchValue({
      service: this.selectedService.nom
    });
  }

  handleServiceChange() {
    this.selectedService = {
      id: null,
      nom: this.firstFormGroup.get('service').value
    };
    console.log('CHANGED', this.selectedService);
  }


  submitForm() {
    console.log(this.firstFormGroup, this.secondFormGroup, this.selectedDirection);


    const newPoste: Poste = {
      competences: this.competences,
      direction: this.selectedDirection,
      division: this.firstFormGroup.get('division').value,
      nom: this.secondFormGroup.get('posteName').value,
      service: this.selectedService
    };

    this.store.dispatch(new CreatePoste(newPoste)).subscribe(() => this.dialogRef.close());
  }


  ngOnInit() {
    this.firstFormGroup = this.formBuilder.group({
      service: [''],
      division: [''],
      direction: ['']
    });
    this.secondFormGroup = this.formBuilder.group({
      posteName: [''],
      competences: this.formBuilder.array([])
    });
    this.competences = [];
  }

}
