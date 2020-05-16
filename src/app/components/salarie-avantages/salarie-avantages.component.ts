import {Component, OnInit} from '@angular/core';
import {MatDialog, MatSnackBar, MatTableDataSource} from '@angular/material';
import {CongesService} from '../../services/conges.service';
import {SalariesService} from '../../services/salaries.service';
import {ActivatedRoute} from '@angular/router';
import {AvantageNature} from '../../models/avatange';
import {Salarie} from '../../models/salarie';
import {AvantageFormComponent} from '../forms/avantage-form/avantage-form.component';

@Component({
  selector: 'app-salarie-avantages',
  templateUrl: './salarie-avantages.component.html',
  styleUrls: ['./salarie-avantages.component.css']
})
export class SalarieAvantagesComponent implements OnInit {

  id: number;
  salarieLoaded: boolean;
  salarie: Salarie;

  avantages: AvantageNature[];
  dataSource: MatTableDataSource<AvantageNature>;
  columns: string[] = ['specification', 'type', 'commission', 'actions'];

  // @ViewChild(MatSort, {static: true}) sort: MatSort;

  constructor(
    private congesService: CongesService,
    private _snackBar: MatSnackBar,
    private dialog: MatDialog,
    private salariesService: SalariesService,
    private activatedRoute: ActivatedRoute
  ) {
    this.dataSource = new MatTableDataSource<AvantageNature>();
    this.dataSource.filterPredicate = (data: any, filter) => {
      const dataStr = JSON.stringify(data).toLowerCase();
      return dataStr.indexOf(filter) !== -1;
    };
    this.salariesService.emitChange.subscribe(
      data => {
        this.salarie = data;
        this.dataSource.data = this.avantages = this.salarie.avantages;
        this.salarieLoaded = true;
      }
    );
  }

  ngOnInit() {
    this.salarieLoaded = false;
  }

  openSnackBar(message: string) {
    this._snackBar.open(message, 'OK', {
      duration: 2000,
    });
  }


  openAvantageForm() {
    const dialogRef = this.dialog.open(AvantageFormComponent, {
      width: '500px',
      data: this.salarie
    });
    dialogRef.afterClosed().subscribe(
      data => {
        if (data !== undefined) {
          this.avantages.push(data);
          this.dataSource.data = this.avantages;
        }
      }
    );
  }
}
