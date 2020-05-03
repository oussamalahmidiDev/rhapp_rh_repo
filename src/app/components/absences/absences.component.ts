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


  constructor( private absencesService:AbsencesService,private _snackBar: MatSnackBar, private dialog: MatDialog, private salariesService: SalariesService) {
    this.absencesDs = new MatTableDataSource<Absence>();

    this.absencesDs.filterPredicate = (data: any, filter) => {
      const dataStr = JSON.stringify(data).toLowerCase();
      return dataStr.indexOf(filter) !== -1;
    };
  }

  // dataSource: MatTableDataSource < Element[] > ;
  ngOnInit() {
    this.getAbsences();

    // this.absences = [
    //   {dateDeDebut: new Date(), dateDeFin: new Date(), type: 'Urgence', justificatif: null, salarie: this.salarie},
    //   {dateDeDebut: new Date(), dateDeFin: new Date(), type: 'Maladie', justificatif: null, salarie: this.salarie},
    //   {dateDeDebut: new Date(), dateDeFin: new Date(), type: 'Urgence', justificatif: null, salarie: this.salarie},
    // ];
    // this.absencesDs.data = this.absences;
    // this.absencesDs.sort = this.sort;
  }

  openSnackBar() {
    this._snackBar.open('Virements ajouté', 'OK', {
      duration: 2000,
    });
  }

  openRetraiteFrom(conge: Conge): void {
    console.log('CONG', conge);
    const dialogRef = this.dialog.open(RetraiteFormComponent, {
      width: '460px',
      data: conge
      // data: this.mesVirements
      // virement: this.newVirement
    });
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
