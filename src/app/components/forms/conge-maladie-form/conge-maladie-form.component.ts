import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Salarie} from '../../../models/salarie';
import {CongesService} from '../../../services/conges.service';
import {SalariesService} from '../../../services/salaries.service';
import {MatDialogRef} from '@angular/material';
import {AbsenceFormComponent} from '../absence-form/absence-form.component';
import {CongeMaladieRequest} from '../../../models/congeMaladieRequest';
import {Select, Store} from '@ngxs/store';
import {AddCongeMaladie} from 'src/app/actions/conges.action';
import {Observable} from 'rxjs';
import {SalariesState} from '../../../states/salaries.state';

@Component({
  selector: 'app-conge-maladie-form',
  templateUrl: './conge-maladie-form.component.html',
  styleUrls: ['./conge-maladie-form.component.css']
})
export class CongeMaladieFormComponent implements OnInit {

  congeMaladieForm: FormGroup;

  @Select(SalariesState.getSalaries)
  salaries: Observable<Salarie[]>;
  salariesLoaded: boolean;

  constructor(private formBuilder: FormBuilder,
              public dialogRef: MatDialogRef<AbsenceFormComponent>,
              private congeService: CongesService,
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
    this.store.dispatch(new AddCongeMaladie(congeMaladie)).subscribe((data) => this.dialogRef.close(data));
  }

}
