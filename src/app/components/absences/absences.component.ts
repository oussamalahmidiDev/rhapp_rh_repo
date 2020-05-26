import {Component, Injectable, OnInit, ViewChild} from '@angular/core';
import {MatDialog, MatSnackBar, MatSort, MatTableDataSource} from '@angular/material';
import {Absence} from '../../models/absence';
import {SalariesService} from '../../services/salaries.service';
import {AbsencesService} from '../../services/absences.service';
import {AbsenceFormComponent} from '../forms/absence-form/absence-form.component';
import {ActivatedRoute} from '@angular/router';
import {Select, Store} from '@ngxs/store';
import {AbsencesState} from 'src/app/states/absences.state';
import {Observable} from 'rxjs';
import {GetSalaries} from 'src/app/actions/salaries.action';
import {GetAbsences} from 'src/app/actions/absences.action';


@Injectable()
@Component({
  selector: 'app-absences',
  templateUrl: './absences.component.html',
  styleUrls: ['./absences.component.css']
})
export class AbsencesComponent implements OnInit {

  @Select(AbsencesState.getAbsences)
  absences: Observable<Absence[]>;

  absencesDs: MatTableDataSource<Absence>;
  absenceCols: string[] = ['salarie', 'datedebut', 'datefin', 'type', 'justificatif'];

  // @ts-ignore
  @ViewChild(MatSort, {static: true}) sort: MatSort;


  constructor(
    private absencesService: AbsencesService,
    private snackBar: MatSnackBar,
    private dialog: MatDialog,
    private salariesService: SalariesService,
    private activatedRoute: ActivatedRoute,
    private store: Store
  ) {
  }

  ngOnInit() {
    this.absences.subscribe(
      data => {
        this.absencesDs = new MatTableDataSource<Absence>(data);
        this.absencesDs.filterPredicate = (data: any, filter) => {
          const dataStr = JSON.stringify(data).toLowerCase();
          return dataStr.indexOf(filter) !== -1;
        };
      }
    );
    this.store.dispatch(new GetAbsences())
      .subscribe(() => this.store.dispatch(new GetSalaries()));

  }

  openSnackBar(message: string) {
    this.snackBar.open(message, 'OK', {
      duration: 2000,
    });
  }

  openAbsenceForm() {
    const dialogRef = this.dialog.open(AbsenceFormComponent, {
      width: '500px',
      disableClose: true
    });
    dialogRef.afterClosed().subscribe(
      data => {
        if (data !== undefined) {
          this.openSnackBar(`L'absence de  ${data.salarie.nom} a été enregistré`);
        }
      }
    );
  }

  search($event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.absencesDs.filter = filterValue.trim().toLowerCase();
  }


}
