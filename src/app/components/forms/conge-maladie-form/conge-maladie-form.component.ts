import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Salarie } from 'src/app/models/salarie';
import { CongesService } from 'src/app/services/conges.service';
import { SalariesService } from 'src/app/services/salaries.service';
import { MatDialogRef } from '@angular/material';
import { AbsenceFormComponent } from '../absence-form/absence-form.component';
import { Conge } from 'src/app/models/conge';
import { CongeMaladieRequest } from 'src/app/models/congeMaladieRequest';

@Component({
  selector: 'app-conge-maladie-form',
  templateUrl: './conge-maladie-form.component.html',
  styleUrls: ['./conge-maladie-form.component.css']
})
export class CongeMaladieFormComponent implements OnInit {

  congeMaladieForm: FormGroup;

  salaries: Salarie[];
  selectedSalarie: Salarie;
  salariesLoaded: boolean;
  
  constructor(private _formBuilder: FormBuilder,
    public dialogRef: MatDialogRef<AbsenceFormComponent>,
    private congeService: CongesService,
    private salariesService: SalariesService
  ) { }

  ngOnInit() {
    this.salariesLoaded = false;
    this.salariesService.getSalaries()
    .subscribe(data => {
      this.salaries = data;
      this.salariesLoaded = true;
    });
    this.congeMaladieForm = this._formBuilder.group({
      salarieId: ['', Validators.required],
      dateDebut: ['', Validators.required],
      dateFin: ['', Validators.required],
      motif: ['', Validators.required]
    });

    this.dialogRef.backdropClick().subscribe(
      _ => {
          if (!this.congeMaladieForm.dirty) {
              console.log("FORM IS TOUCHED");
              this.dialogRef.close();
          }
          else {
              if(confirm("Vos données vont être ignorés. Voulez-vous continuez ?"))
                  this.dialogRef.close();
          }
      }
    )
  }

  onSubmit () {
    const congeMaladie: CongeMaladieRequest = this.congeMaladieForm.value;
    console.log(congeMaladie);
    this.congeService.createCongeMaladie(congeMaladie).subscribe(
      data => {
        this.dialogRef.close(data);        
      }
    )
  }

}
