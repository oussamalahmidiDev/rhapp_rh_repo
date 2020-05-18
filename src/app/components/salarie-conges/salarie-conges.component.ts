import {Component, OnInit} from '@angular/core';
import {Conge} from '../../models/conge';
import {MatDialog, MatSnackBar, MatTableDataSource} from '@angular/material';
import {CongeReponseFormComponent} from '../forms/conge-reponse-form/conge-reponse-form.component';
import {SalariesService} from '../../services/salaries.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-salarie-conges',
  templateUrl: './salarie-conges.component.html',
  styleUrls: ['./salarie-conges.component.css']
})
export class SalarieCongesComponent implements OnInit {

  // salarie: Salarie = this.salariesService.getSalarie('U73540990');

  id = parseInt(this.route.parent.snapshot.paramMap.get('id'));

  conges: Conge[];
  congesDs: MatTableDataSource<Conge>;
  congeCols: string[] = ['motif', 'type', 'datedebut', 'datefin', 'etat', 'actions'];

  constructor(
    private _snackBar: MatSnackBar,
    private dialog: MatDialog,
    private salariesService: SalariesService,
    private route: ActivatedRoute
    ) {
    this.congesDs = new MatTableDataSource<Conge>();
  }

  // dataSource: MatTableDataSource < Element[] > ;
  ngOnInit() {
    console.log("LOADING SALARIES CONGES ...");
    this.salariesService.getSalarieConges(this.id).subscribe(
      data => {
        this.conges = data;
        this.congesDs.data = this.conges;
      }
    );
  }

  openSnackBar() {
    this._snackBar.open('Virements ajouté', 'OK', {
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
          this.conges = this.conges.map(
            conge => {
              if (conge.id == data.id) {
                return data;
              }
            }
          );
          this.congesDs.data = this.conges;
        }
      }
    )
  }

}
