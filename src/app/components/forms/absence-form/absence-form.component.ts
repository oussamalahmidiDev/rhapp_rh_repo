import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Salarie } from '../../../models/salarie';
import { AbsencesService } from '../../../services/absences.service';
import { MatDialogRef } from '@angular/material';
import { SalariesService } from '../../../services/salaries.service';

@Component({
  selector: 'app-absence-form',
  templateUrl: './absence-form.component.html',
  styleUrls: ['./absence-form.component.css']
})
export class AbsenceFormComponent implements OnInit {

  absenceForm: FormGroup;

  salaries: Salarie[];
  selectedSalarie: Salarie;
  salariesLoaded: boolean;

  justificatif: File;

  uploadProgress = 0;
  uploading = false;

  types: string[];

  constructor(private _formBuilder: FormBuilder,
    public dialogRef: MatDialogRef<AbsenceFormComponent>,
    private absenceService: AbsencesService,
    private salariesService: SalariesService
  ) {}

  ngOnInit() {
    this.types = [
      'Décès',
      'Maladie',
      'Marriage'
    ];

    this.salariesLoaded = false;
    this.salariesService.getSalaries()
    .subscribe(data => {
      this.salaries = data;
      this.salariesLoaded = true;
    });

    this.absenceForm = this._formBuilder.group({
      salarieId: ['', Validators.required],
      dateDebut: ['', Validators.required],
      dateFin: ['', Validators.required],
      type: ['', Validators.required]
    });

    this.dialogRef.backdropClick().subscribe(
      _ => {
          if (!this.absenceForm.dirty) {
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

  onSubmit() {
    const formData: FormData = new FormData();
    formData.append('salarie_id', this.absenceForm.get('salarieId').value);
    formData.append('dateDebut', this.absenceForm.get('dateDebut').value);
    formData.append('dateFin', this.absenceForm.get('dateFin').value);
    formData.append('type', this.absenceForm.get('type').value);
    // formData.append('justificatif', this.justificatif);
    if (this.justificatif) {
      formData.append('justificatif', this.justificatif);
    } else {
      formData.append('justificatif', null);
    }


    this.absenceService.createAbsence(formData).subscribe(
      data => {
        console.log(data);
        this.dialogRef.close(data);
      },
      error => console.log(error.error)
    );

    // console.log(formData.get());
  }

  handleJustificatif($event) {
    this.justificatif = $event.target.files[0];
    console.log(this.justificatif);
  }

}
