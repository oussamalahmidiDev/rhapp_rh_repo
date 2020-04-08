import {Component, OnInit, Injectable, ViewChild} from '@angular/core';
import {MatSnackBar, MatDialog, MatTableDataSource, MatSort} from '@angular/material';
import {Conge} from 'src/app/models/conge';
import {CongeReponseFormComponent} from '../forms/conge-reponse-form/conge-reponse-form.component';
import {PosteFormComponent} from '../forms/conge-form/conge-form.component';
import {Salarie} from '../../models/salarie';
import {SalariesService} from '../../services/salaries.service';


@Injectable()
@Component({
  selector: 'app-conges',
  templateUrl: './conges.component.html',
  styleUrls: ['./conges.component.css']
})
export class CongesComponent implements OnInit {

  salarie: Salarie = this.salariesService.getSalarie('U73540990');

  conges: Conge[];
  congesDs: MatTableDataSource<Conge>;
  congeCols: string[] = ['salarie', 'motif', 'type', 'datedebut', 'datefin', 'etat', 'actions'];

  // @ts-ignore
  @ViewChild(MatSort, {static: true}) sort: MatSort;

  constructor(private _snackBar: MatSnackBar, private dialog: MatDialog, private salariesService: SalariesService) {
    this.congesDs = new MatTableDataSource<Conge>();
    this.congesDs.filterPredicate = (data: any, filter) => {
      const dataStr = JSON.stringify(data).toLowerCase();
      return dataStr.indexOf(filter) !== -1;
    };

  }

  // dataSource: MatTableDataSource < Element[] > ;
  ngOnInit() {
    this.conges = [
      {
        motif: 'Motif X',
        type: 'Voyage',
        dateDeDebut: new Date(),
        dateDeFin: new Date(),
        etat: {etat: 'En attente', motif: null},
        salarie: this.salarie
      },
      {
        motif: 'Motif X',
        type: 'Autre',
        dateDeDebut: new Date(),
        dateDeFin: new Date(),
        etat: {etat: 'En cours', motif: null},
        salarie: this.salarie
      },
      {
        motif: 'Motif X',
        type: 'Voyage',
        dateDeDebut: new Date(),
        dateDeFin: new Date(),
        etat: {etat: 'Refusée', motif: 'Pour la raison ...'},
        salarie: this.salarie
      },
      {
        motif: 'Motif X',
        type: 'Voyage',
        dateDeDebut: new Date(),
        dateDeFin: new Date(),
        etat: {etat: 'Acceptée', motif: null},
        salarie: this.salarie
      },
    ];
    this.congesDs.data = this.conges;
    this.congesDs.sort = this.sort;


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

  openVirementForm(): void {
    const dialogRef = this.dialog.open(PosteFormComponent, {
      width: '500px',
      // data: this.mesVirements
      // virement: this.newVirement
    });

  };

  search($event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.congesDs.filter = filterValue.trim().toLowerCase();
  }


}
