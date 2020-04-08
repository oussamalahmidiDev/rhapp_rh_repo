import {Component, OnInit, Injectable, ViewChild} from '@angular/core';
import {MatSnackBar, MatDialog, MatTableDataSource, MatSort} from '@angular/material';
import { Poste } from 'src/app/models/poste';
import { Conge } from 'src/app/models/conge';
import { Retraite } from 'src/app/models/retraite';
import {RetraiteFormComponent} from '../forms/retraite-form/retraite-form.component';
import {PosteFormComponent} from '../forms/conge-form/conge-form.component';
import {Salarie} from '../../models/salarie';
import {SalariesService} from '../../services/salaries.service';


@Injectable()
@Component({
  selector: 'app-retraites',
  templateUrl: './retraites.component.html',
  styleUrls: ['./retraites.component.css']
})
export class RetraitesComponent implements OnInit {

  salarie: Salarie = this.salariesService.getSalarie('U73540990');

  retraites: Retraite[];
  retraitesDs: MatTableDataSource<Retraite>;
  retraiteCols: string[] = ['salarie','date', 'type', 'ref',  'etat'];

  // @ts-ignore
  @ViewChild(MatSort, {static: true}) sort: MatSort;

  constructor(private _snackBar: MatSnackBar, private dialog: MatDialog, private salariesService: SalariesService) {
    this.retraitesDs = new MatTableDataSource<Retraite>();
    this.retraitesDs.filterPredicate = (data: any, filter) => {
      const dataStr = JSON.stringify(data).toLowerCase();
      return dataStr.indexOf(filter) != -1;
    };
   }
  // dataSource: MatTableDataSource < Element[] > ;
  ngOnInit() {


    this.retraites = [
      { ref: "REF2020", type: "Retraite", date: new Date(), etat: "INVALID", salarie: this.salarie },
      { ref: "REF2010", type: "Retraite", date: new Date(), etat: "VALID", salarie: this.salarie },
      { ref: "REF2020", type: "Retraite", date: new Date(), etat: "AVTG_NOTRETIRED", salarie: this.salarie },

    ]
    this.retraitesDs.data = this.retraites;
    this.retraitesDs.sort = this.sort;
  }

  openSnackBar() {
    this._snackBar.open("Virements ajouté", "OK", {
      duration: 2000,
    });
  }

  openRetraiteFrom(conge: Conge): void {
    console.log("CONG", conge);
    const dialogRef = this.dialog.open(RetraiteFormComponent, {
      width: '460px',
      data: conge
     // data: this.mesVirements
      // virement: this.newVirement
    })
  }

  openVirementForm(): void {
    const dialogRef = this.dialog.open(PosteFormComponent, {
      width: '500px',
     // data: this.mesVirements
      // virement: this.newVirement
    })

  };

  search($event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.retraitesDs.filter = filterValue.trim().toLowerCase();
  }



}
