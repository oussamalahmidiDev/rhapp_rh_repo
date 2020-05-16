import {Component, OnInit, Injectable, ViewChild} from '@angular/core';
import {MatSnackBar, MatDialog, MatTableDataSource, MatSort} from '@angular/material';
import {Poste} from 'src/app/models/poste';
import {Conge} from 'src/app/models/conge';
import {Retraite} from 'src/app/models/retraite';
import {RetraiteFormComponent} from '../forms/retraite-form/retraite-form.component';
import {Salarie} from '../../models/salarie';
import {SalariesService} from '../../services/salaries.service';


@Injectable()
@Component({
  selector: 'app-retraites',
  templateUrl: './retraites.component.html',
  styleUrls: ['./retraites.component.css']
})
export class RetraitesComponent implements OnInit {


  retraites: Retraite[];
  retraitesDs: MatTableDataSource<Retraite>;
  retraiteCols: string[] = ['salarie', 'date', 'type', 'ref', 'etat'];

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
    ];
    this.retraitesDs.data = this.retraites;
    this.retraitesDs.sort = this.sort;
  }

  openSnackBar() {
    this._snackBar.open('Virements ajouté', 'OK', {
      duration: 2000,
    });
  }

  openRetraiteFrom(): void {
    const dialogRef = this.dialog.open(RetraiteFormComponent, {
      width: '500px',
      // data: this.mesVirements
      // virement: this.newVirement
    });
  }

  search($event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.retraitesDs.filter = filterValue.trim().toLowerCase();
  }


}
