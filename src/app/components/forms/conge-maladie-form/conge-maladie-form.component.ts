import {Component, Inject, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Salarie} from '../../../models/salarie';
import {CongesService} from '../../../services/conges.service';
import {SalariesService} from '../../../services/salaries.service';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material';
import {AbsenceFormComponent} from '../absence-form/absence-form.component';
import {CongeMaladieRequest} from '../../../models/congeMaladieRequest';
import {Select, Store} from '@ngxs/store';
import {AddCongeMaladie, ModifierConge} from 'src/app/actions/conges.action';
import {Observable} from 'rxjs';
import {SalariesState} from '../../../states/salaries.state';
import {Conge} from 'src/app/models/conge';

@Component({
  selector: 'app-conge-maladie-form',
  templateUrl: './conge-maladie-form.component.html',
  styleUrls: ['./conge-maladie-form.component.css']
})
export class CongeMaladieFormComponent implements OnInit {

  congeMaladieForm: FormGroup;

  editForm = false;

  @Select(SalariesState.getSalaries)
  salaries: Observable<Salarie[]>;
  salariesLoaded: boolean;

  constructor(private formBuilder: FormBuilder,
              public dialogRef: MatDialogRef<AbsenceFormComponent>,
              private congeService: CongesService,
              @Inject(MAT_DIALOG_DATA) public data: Conge,
              private salariesService: SalariesService,
              private store: Store
  ) {
  }

  ngOnInit() {

    this.salariesLoaded = true;

    this.congeMaladieForm = this.formBuilder.group({
      salarieId: ['', Validators.required],
      dateDebut: ['', Validators.required],
      dateFin: ['', Validators.required],
      motif: ['', Validators.required]
    });

    if (this.data) {
      this.editForm = true;
      this.congeMaladieForm.get('salarieId');
      this.congeMaladieForm.patchValue({
        salarieId: this.data.salarie.id,
        ...this.data,
        dateDebut: new Date(this.data.dateDebut).toISOString().substring(0, 10),
        dateFin: new Date(this.data.dateFin).toISOString().substring(0, 10)
      });
      console.log(this.data);
    }

    this.dialogRef.backdropClick().subscribe(
      _ => {
        if (!this.congeMaladieForm.dirty) {
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
    const congeMaladie: CongeMaladieRequest = this.congeMaladieForm.value;
    if (!this.editForm) {
      this.store.dispatch(new AddCongeMaladie(congeMaladie)).subscribe((data) => this.dialogRef.close(data));
    } else {
      this.store.dispatch(new ModifierConge(this.data.id, {
        ...congeMaladie,
        type: this.data.type
      })).subscribe((data) => this.dialogRef.close(data));
    }
  }

}
