import { Component, OnInit } from '@angular/core';
import {Conge} from '../../models/conge';
import {MatDialog, MatSnackBar, MatTableDataSource} from '@angular/material';
import {CongeReponseFormComponent} from '../forms/conge-reponse-form/conge-reponse-form.component';
import {PosteFormComponent} from '../forms/conge-form/conge-form.component';
import {Salarie} from '../../models/salarie';
import {SalariesService} from '../../services/salaries.service';

@Component({
  selector: 'app-salarie-conges',
  templateUrl: './salarie-conges.component.html',
  styleUrls: ['./salarie-conges.component.css']
})
export class SalarieCongesComponent implements OnInit {

  salarie: Salarie = this.salariesService.getSalarie('U73540990');

  conges: Conge[];
  congesDs: MatTableDataSource<Conge>;
  congeCols: string[] = ['motif', 'type', 'datedebut', 'datefin', 'etat', 'actions'];

  constructor(private _snackBar: MatSnackBar, private dialog: MatDialog, private salariesService: SalariesService) {
    this.congesDs = new MatTableDataSource<Conge>();
  }
  // dataSource: MatTableDataSource < Element[] > ;
  ngOnInit() {
    this.conges = [
      { motif: "Motif X", type: "Voyage", dateDeDebut: new Date(), dateDeFin: new Date(), etat: { etat: "En attente", motif: null }, salarie: this.salarie },
      { motif: "Motif X", type: "Voyage", dateDeDebut: new Date(), dateDeFin: new Date(), etat: { etat: "En cours", motif: null }, salarie: this.salarie },
      { motif: "Motif X", type: "Voyage", dateDeDebut: new Date(), dateDeFin: new Date(), etat: { etat: "Refusée", motif: "Pour la raison ..." }, salarie: this.salarie },
      { motif: "Motif X", type: "Voyage", dateDeDebut: new Date(), dateDeFin: new Date(), etat: { etat: "Acceptée", motif: null }, salarie: this.salarie },
    ]
    this.congesDs.data = this.conges;
  }

  openSnackBar() {
    this._snackBar.open("Virements ajouté", "OK", {
      duration: 2000,
    });
  }

  openCongeReponseForm(conge: Conge): void {
    console.log("CONG", conge);
    const dialogRef = this.dialog.open(CongeReponseFormComponent, {
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
}
