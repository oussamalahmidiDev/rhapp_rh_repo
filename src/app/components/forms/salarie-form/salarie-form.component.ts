import { Component, OnInit } from '@angular/core';
import { Service } from '../../../models/service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material';
import { SalariesService } from '../../../services/salaries.service';
import { PosteService } from '../../../services/poste.service';
import { Direction } from '../../../models/direction';
import { Salarie } from '../../../models/salarie';

@Component({
  selector: 'app-salarie-form',
  templateUrl: './salarie-form.component.html',
  styleUrls: ['./salarie-form.component.css']
})
export class SalarieFormComponent implements OnInit {


  services: Service[];
  directions: Direction[];

  selectedDirection: Direction;
  selectedService: Service;

  firstFormGroup: FormGroup;
  secondFormGroup: FormGroup;
  thirdFormGroup: FormGroup;

  constructor(
    private _formBuilder: FormBuilder,
    public dialogRef: MatDialogRef<SalarieFormComponent>,
    private salariesService: SalariesService,
    private posteService: PosteService) { }

  ngOnInit() {
    this.posteService.getServices().subscribe(
      data => this.services = data
    );
    this.posteService.getDirections().subscribe(
      data => this.directions = data
    );

    this.firstFormGroup = this._formBuilder.group({
      service: ['', Validators.required],
      direction: ['', Validators.required],
      numSomme: ['', Validators.required]
    });

    this.secondFormGroup = this._formBuilder.group({
      nom: ['', Validators.required],
      prenom: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
    });

    this.thirdFormGroup = this._formBuilder.group({
      solde: ['', [Validators.required, Validators.min(1)]]
    });
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

  onSubmit () {
    const salarie: Salarie = {
      nom: this.secondFormGroup.value.nom,
      prenom: this.secondFormGroup.value.prenom,
      email: this.secondFormGroup.value.email,

      numSomme: this.firstFormGroup.value.numSomme,
      direction: this.selectedDirection,
      service: this.selectedService,
      solde: this.thirdFormGroup.value.solde
    }
    console.log("FINAL SALARIE :", salarie );
    this.salariesService.createSalarie(salarie).subscribe(
      data => this.dialogRef.close(data),
      error => alert(error.error.message)
    );
  }


}
