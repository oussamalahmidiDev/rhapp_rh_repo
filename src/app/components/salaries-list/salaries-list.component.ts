import {Component, Injectable, OnInit, ViewChild} from '@angular/core';
import {MatDialog, MatSnackBar, MatSort, MatTableDataSource} from '@angular/material';
import {Conge} from '../../models/conge';

import {RetraiteFormComponent} from '../forms/retraite-form/retraite-form.component';
import {SalariesService} from '../../services/salaries.service';
import {Salarie} from '../../models/salarie';
import {SalarieFormComponent} from '../forms/salarie-form/salarie-form.component';
import {ActivatedRoute} from '@angular/router';
import {Select, Store} from '@ngxs/store';
import {Observable} from 'rxjs';
import {GetSalaries} from 'src/app/actions/salaries.action';
import {SalariesState} from '../../states/salaries.state';


@Injectable()
@Component({
  selector: 'app-salaries-list',
  templateUrl: './salaries-list.component.html',
  styleUrls: ['./salaries-list.component.css']
})
export class SalariesListComponent implements OnInit {

  salariesDs: MatTableDataSource<Salarie>;
  salarieCols: string[] = ['salarie', 'email', 'direction', 'division', 'service'];

  @Select(SalariesState.getSalaries)
  salaries: Observable<Salarie[]>;

  // @ts-ignore
  @ViewChild(MatSort, {static: true}) sort: MatSort;


  constructor(
    private snackBar: MatSnackBar,
    private dialog: MatDialog,
    private service: SalariesService,
    private activatedRoute: ActivatedRoute,
    private store: Store
  ) {

  }

  ngOnInit() {
    this.store.dispatch(new GetSalaries());
    this.salaries.subscribe(data => {
      this.salariesDs = new MatTableDataSource<Salarie>(data);
      this.salariesDs.filterPredicate = (data: any, filter) => {
        const dataStr = JSON.stringify(data).toLowerCase();
        return dataStr.indexOf(filter) !== -1;
      };
    });
  }

  openSnackBar() {
    this.snackBar.open('Virements ajouté', 'OK', {
      duration: 2000,
    });
  }

  openSalarieForm() {
    const dialogRef = this.dialog.open(SalarieFormComponent, {
      width: '600px',
      disableClose: true
    });
    // dialogRef.afterClosed().subscribe(
    //   data => {
    //     if (data !== undefined) {
    //       this.salaries.push(data);
    //       this.salariesDs.data = this.salaries;
    //     }
    //   }
    // )
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
    this.salariesDs.filter = filterValue.trim().toLowerCase();
  }

}
