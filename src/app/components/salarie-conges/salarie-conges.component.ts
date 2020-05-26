import {Component, OnInit} from '@angular/core';
import {Conge} from '../../models/conge';
import {MatDialog, MatSnackBar, MatTableDataSource} from '@angular/material';
import {CongeReponseFormComponent} from '../forms/conge-reponse-form/conge-reponse-form.component';
import {Select} from '@ngxs/store';
import {Observable} from 'rxjs';
import {SalariesState} from '../../states/salaries.state';

@Component({
  selector: 'app-salarie-conges',
  templateUrl: './salarie-conges.component.html',
  styleUrls: ['./salarie-conges.component.css']
})
export class SalarieCongesComponent implements OnInit {


  @Select(SalariesState.getSelectedSalarieConges)
  conges: Observable<Conge[]>;

  congesDs: MatTableDataSource<Conge>;
  congeCols: string[] = ['motif', 'type', 'datedebut', 'datefin', 'etat', 'actions'];

  constructor(
    private snackBar: MatSnackBar,
    private dialog: MatDialog,
  ) {
  }

  // dataSource: MatTableDataSource < Element[] > ;
  ngOnInit() {
    this.conges.subscribe(
      data => {
        this.congesDs = new MatTableDataSource<Conge>(data);
      }
    );
  }

  openSnackBar() {
    this.snackBar.open('Virements ajouté', 'OK', {
      duration: 2000,
    });
  }

  openCongeReponseForm(conge: Conge): void {
    const dialogRef = this.dialog.open(CongeReponseFormComponent, {
      width: '460px',
      data: conge
    });
    dialogRef.afterClosed().subscribe(
      data => {
        if (data !== undefined) {
          // this.conges = this.conges.map(
          //   conge => {
          //     if (conge.id == data.id) {
          //       return data;
          //     }
          //   }
          // );
          // this.congesDs.data = this.conges;
        }
      }
    );
  }

}
