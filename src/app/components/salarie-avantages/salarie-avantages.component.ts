import {Component, OnInit} from '@angular/core';
import {MatDialog, MatSnackBar, MatTableDataSource} from '@angular/material';
import {CongesService} from '../../services/conges.service';
import {AvantageNature} from '../../models/avatange';
import {Salarie} from '../../models/salarie';
import {AvantageFormComponent} from '../forms/avantage-form/avantage-form.component';
import {Select} from '@ngxs/store';
import {Observable} from 'rxjs';
import {SalariesState} from '../../states/salaries.state';

@Component({
  selector: 'app-salarie-avantages',
  templateUrl: './salarie-avantages.component.html',
  styleUrls: ['./salarie-avantages.component.css']
})
export class SalarieAvantagesComponent implements OnInit {

  id: number;
  salarieLoaded: boolean;

  @Select(SalariesState.getSelectedSalarie)
  salarie: Observable<Salarie>;

  @Select(SalariesState.getSelectedSalarieAvantages)
  avantages: Observable<AvantageNature[]>;
  dataSource: MatTableDataSource<AvantageNature>;
  columns: string[] = ['specification', 'type', 'commission', 'actions'];


  constructor(
    private congesService: CongesService,
    private snackBar: MatSnackBar,
    private dialog: MatDialog,
  ) {
  }

  ngOnInit() {
    this.salarieLoaded = true;
    this.avantages.subscribe(data => {
      this.dataSource = new MatTableDataSource<AvantageNature>(data);
      this.dataSource.filterPredicate = (data: any, filter) => {
        const dataStr = JSON.stringify(data).toLowerCase();
        return dataStr.indexOf(filter) !== -1;
      };
    });
  }

  openSnackBar(message: string) {
    this.snackBar.open(message, 'OK', {
      duration: 2000,
    });
  }


  openAvantageForm() {
    const dialogRef = this.dialog.open(AvantageFormComponent, {
      width: '500px',
      // data: this.salarie
    });
    dialogRef.afterClosed().subscribe(
      data => {
        // if (data !== undefined) {
        //   this.avantages.push(data);
        //   this.dataSource.data = this.avantages;
        // }
      }
    );
  }
}
