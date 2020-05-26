import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Salarie} from '../../../models/salarie';
import {AbsencesService} from '../../../services/absences.service';
import {MatDialogRef} from '@angular/material';
import {SalariesService} from '../../../services/salaries.service';
import {Select, Store} from '@ngxs/store';
import {AddAbsence} from 'src/app/actions/absences.action';
import {Observable} from 'rxjs';
import {SalariesState} from '../../../states/salaries.state';

@Component({
  selector: 'app-absence-form',
  templateUrl: './absence-form.component.html',
  styleUrls: ['./absence-form.component.css']
})
export class AbsenceFormComponent implements OnInit {

  absenceForm: FormGroup;

  @Select(SalariesState.getSalaries)
  salaries: Observable<Salarie[]>;
  salariesLoaded: boolean;

  justificatif: File;

  uploadProgress = 0;
  uploading = false;

  types: string[];

  constructor(private formBuilder: FormBuilder,
              public dialogRef: MatDialogRef<AbsenceFormComponent>,
              private absenceService: AbsencesService,
              private salariesService: SalariesService,
              private store: Store
  ) {
  }

  ngOnInit() {
    this.types = [
      'Décès',
      'Maladie',
      'Marriage'
    ];

    this.salariesLoaded = true;

    this.absenceForm = this.formBuilder.group({
      salarieId: ['', Validators.required],
      dateDebut: ['', Validators.required],
      dateFin: ['', Validators.required],
      type: ['', Validators.required]
    });

    this.dialogRef.backdropClick().subscribe(
      _ => {
        if (!this.absenceForm.dirty) {
          console.log('FORM IS TOUCHED');
          this.dialogRef.close();
        } else {
          if (confirm('Vos données vont être ignorés. Voulez-vous continuez ?')) {
            this.dialogRef.close();
          }
        }
      }
    );
  }

  onSubmit() {
    const formData: FormData = new FormData();
    formData.append('salarie_id', this.absenceForm.get('salarieId').value);
    formData.append('dateDebut', this.absenceForm.get('dateDebut').value);
    formData.append('dateFin', this.absenceForm.get('dateFin').value);
    formData.append('type', this.absenceForm.get('type').value);
    if (this.justificatif) {
      formData.append('justificatif', this.justificatif);
    } else {
      formData.append('justificatif', null);
    }

    this.store.dispatch(new AddAbsence(formData)).subscribe(() => this.dialogRef.close());

  }

  handleJustificatif($event) {
    this.justificatif = $event.target.files[0];
    console.log(this.justificatif);
  }

}
