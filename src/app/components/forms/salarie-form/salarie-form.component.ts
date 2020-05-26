import {Component, OnInit} from '@angular/core';
import {Service} from '../../../models/service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {MatDialogRef} from '@angular/material';
import {Direction} from '../../../models/direction';
import {Salarie} from '../../../models/salarie';
import {Select, Store} from '@ngxs/store';
import {AddSalarie} from 'src/app/actions/salaries.action';
import {ServicesState} from '../../../states/services.state';
import {Observable} from 'rxjs';
import {DirectionsState} from '../../../states/directions.state';

@Component({
  selector: 'app-salarie-form',
  templateUrl: './salarie-form.component.html',
  styleUrls: ['./salarie-form.component.css']
})
export class SalarieFormComponent implements OnInit {


  @Select(ServicesState.getServices)
  services: Observable<Service[]>;

  @Select(DirectionsState.getDirections)
  directions: Observable<Direction[]>;

  selectedDirection: Direction;
  selectedService: Service;

  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;
  thirdFormGroup: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private store: Store,
    public dialogRef: MatDialogRef<SalarieFormComponent>,
  ) {
  }

  ngOnInit() {

    this.firstFormGroup = this.formBuilder.group({
      service: ['', Validators.required],
      direction: ['', Validators.required],
      numSomme: ['', Validators.required]
    });

    this.secondFormGroup = this.formBuilder.group({
      nom: ['', Validators.required],
      prenom: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
    });

    this.thirdFormGroup = this.formBuilder.group({
      solde: ['', [Validators.required, Validators.min(1)]]
    });

    this.dialogRef.backdropClick().subscribe(() => {
      if (this.firstFormGroup.dirty || this.secondFormGroup.dirty || this.thirdFormGroup.dirty) {
        if (confirm('Voulez vous fermer le formulaire ?')) {
          this.dialogRef.close();
        }
      } else {
        this.dialogRef.close();
      }
    });
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

  onSubmit() {
    const salarie: Salarie = {
      nom: this.secondFormGroup.value.nom,
      prenom: this.secondFormGroup.value.prenom,
      email: this.secondFormGroup.value.email,

      numSomme: this.firstFormGroup.value.numSomme,
      direction: this.selectedDirection,
      service: this.selectedService,
      solde: this.thirdFormGroup.value.solde
    };
    console.log('FINAL SALARIE :', salarie);
    this.store.dispatch(new AddSalarie(salarie)).subscribe(
      () => this.dialogRef.close(),
      err => alert(err.error.message)
    );

  }


}
