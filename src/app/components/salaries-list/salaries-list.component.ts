import {Component, OnInit, Injectable, ViewChild} from '@angular/core';
import {MatSnackBar, MatDialog, MatTableDataSource, MatSort} from '@angular/material';
import {Poste} from 'src/app/models/poste';
import {Conge} from 'src/app/models/conge';
import {Retraite} from 'src/app/models/retraite';
import {Absence} from '../../models/absence';
import {RetraiteFormComponent} from '../forms/retraite-form/retraite-form.component';
import {SalariesService} from '../../services/salaries.service';
import {Salarie} from '../../models/salarie';
import { SalarieFormComponent } from '../forms/salarie-form/salarie-form.component';


@Injectable()
@Component({
  selector: 'app-salaries-list',
  templateUrl: './salaries-list.component.html',
  styleUrls: ['./salaries-list.component.css']
})
export class SalariesListComponent implements OnInit {

  salariesDs: MatTableDataSource<Salarie>;
  salarieCols: string[] = ['salarie', 'email', 'direction', 'division', 'service'];

  salaries: Salarie[];
  // salaries: Salarie[] = this.salariesService.salaries;

  // @ts-ignore
  @ViewChild(MatSort, {static: true}) sort: MatSort;


  constructor(private _snackBar: MatSnackBar, private dialog: MatDialog, private service: SalariesService) {
    this.salariesDs = new MatTableDataSource<Salarie>();

    this.salariesDs.filterPredicate = (data: any, filter) => {
      const dataStr = JSON.stringify(data).toLowerCase();
      return dataStr.indexOf(filter) !== -1;
    };
  }

  // dataSource: MatTableDataSource < Element[] > ;
  ngOnInit() {

    this.service.getSalaries()
    .subscribe(data => {
      this.salaries = data;
      this.salariesDs.data = this.salaries;
      this.salariesDs.sort = this.sort;

    });
  }

  openSnackBar() {
    this._snackBar.open('Virements ajouté', 'OK', {
      duration: 2000,
    });
  }

  openSalarieForm() {
    const dialogRef = this.dialog.open(SalarieFormComponent, {
      width: '600px',
      disableClose: true
    });
    dialogRef.afterClosed().subscribe(
      data => {
        if (data !== undefined) {
          this.salaries.push(data);
          this.salariesDs.data = this.salaries;
        }
      }
    )
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
