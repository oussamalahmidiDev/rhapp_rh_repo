import {Component, OnInit} from '@angular/core';
import {Conge} from '../../models/conge';
import {MatDialog, MatSnackBar, MatTableDataSource} from '@angular/material';
import {CongeReponseFormComponent} from '../forms/conge-reponse-form/conge-reponse-form.component';
import {Salarie} from '../../models/salarie';
import {SalariesService} from '../../services/salaries.service';
import {PosteFormComponent} from '../forms/poste-form/poste-form.component';

@Component({
  selector: 'app-salarie-conges',
  templateUrl: './salarie-conges.component.html',
  styleUrls: ['./salarie-conges.component.css']
})
export class SalarieCongesComponent implements OnInit {

  // salarie: Salarie = this.salariesService.getSalarie('U73540990');

  conges: Conge[];
  congesDs: MatTableDataSource<Conge>;
  congeCols: string[] = ['motif', 'type', 'datedebut', 'datefin', 'etat', 'actions'];

  constructor(private _snackBar: MatSnackBar, private dialog: MatDialog, private salariesService: SalariesService) {
    this.congesDs = new MatTableDataSource<Conge>();
  }

  // dataSource: MatTableDataSource < Element[] > ;
  ngOnInit() {
    this.conges = [
    
    ];
    this.congesDs.data = this.conges;
  }

  openSnackBar() {
    this._snackBar.open('Virements ajouté', 'OK', {
      duration: 2000,
    });
  }

  openCongeReponseForm(conge: Conge): void {
    console.log('CONG', conge);
    const dialogRef = this.dialog.open(CongeReponseFormComponent, {
      width: '460px',
      data: conge
      // data: this.mesVirements
      // virement: this.newVirement
    });
  }

}
