import {Component, OnInit, Injectable, ViewChild} from '@angular/core';
import {MatSnackBar, MatDialog, MatTableDataSource, MatSort} from '@angular/material';
import {Poste} from 'src/app/models/poste';
import {Conge} from 'src/app/models/conge';
import {Retraite} from 'src/app/models/retraite';
import {Absence} from '../../models/absence';
import {RetraiteFormComponent} from '../forms/retraite-form/retraite-form.component';
import {Salarie} from '../../models/salarie';
import {SalariesService} from '../../services/salaries.service';
import {AbsencesService} from '../../services/absences.service';
import { AbsenceFormComponent } from '../forms/absence-form/absence-form.component';


@Injectable()
@Component({
  selector: 'app-absences',
  templateUrl: './absences.component.html',
  styleUrls: ['./absences.component.css']
})
export class AbsencesComponent implements OnInit {

  // salarie: Salarie = this.salariesService.getSalarie('U73540990');

  absences: Absence[];
  absencesDs: MatTableDataSource<Absence>;
  absenceCols: string[] = ['salarie', 'datedebut', 'datefin', 'type', 'justificatif'];

  // @ts-ignore
  @ViewChild(MatSort, {static: true}) sort: MatSort;


  constructor(
    private absencesService:AbsencesService,
    private _snackBar: MatSnackBar, 
    private dialog: MatDialog, 
    private salariesService: SalariesService) {
    this.absencesDs = new MatTableDataSource<Absence>();

    this.absencesDs.filterPredicate = (data: any, filter) => {
      const dataStr = JSON.stringify(data).toLowerCase();
      return dataStr.indexOf(filter) !== -1;
    };
  }

  // dataSource: MatTableDataSource < Element[] > ;
  ngOnInit() {
    this.getAbsences();
  }

  openSnackBar(message: string) {
    this._snackBar.open(message, 'OK', {
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
          console.log('Subtask Dialog output:', data);
          this.absences.unshift(data);
          this.absencesDs.data = this.absences;
          this.openSnackBar(`L'absence de  ${data.salarie.nom} a été enregistré`);
        }
      }
    );
  }

  search($event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.absencesDs.filter = filterValue.trim().toLowerCase();
  }

  getAbsences(){
    this.absencesService.getAbsences().subscribe(data =>{
      console.log(data);
      // @ts-ignore
      this.absences=data;
      this.absencesDs.data = this.absences;
      console.log(this.absencesDs.data);
    },error => {
      console.log(error);
    })
  }

}
