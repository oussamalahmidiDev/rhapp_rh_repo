import { Component, OnInit } from '@angular/core';
import { Virement } from 'src/app/models/virement';
import { Compte } from 'src/app/models/compte';
import {Router} from '@angular/router';



@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  constructor() { }
  displayedColumns: string[] = ['position', 'name', 'weight', 'symbol'];
  // dataSource = ELEMENT_DATA;

  compteColumns: string[] = ['numeroCompte', 'intitule', 'solde', 'dateOperation'];
  mesComptes: Compte[] = [
    { numeroCompte: "67139051493590", intitule: "M. LAHMIDI Oussama", solde: "120", dateOperation: "12 Mars 2020" },
    { numeroCompte: "67139051493590", intitule: "M. LAHMIDI Oussama", solde: "120", dateOperation: "12 Mars 2020" },
    { numeroCompte: "67139051493590", intitule: "M. LAHMIDI Oussama", solde: "120", dateOperation: "12 Mars 2020" },
    { numeroCompte: "67139051493590", intitule: "M. LAHMIDI Oussama", solde: "120", dateOperation: "12 Mars 2020" },
  ];

  virementColumns: string[] = ['id', 'comptexp', 'comptedest', 'montant', 'dateOper', 'statut'];
  mesVirements: Virement[] = [
    { id: "42137235090", compteExp: '67139051493590', compteDest: "791045132", montant: "100", dateOperation: "12 Mars 2020", statut: "VALID" },
    { id: "42137235090", compteExp: '67139051493590', compteDest: "791045132", montant: "100", dateOperation: "12 Mars 2020", statut: "VALID" },
    { id: "42137235090", compteExp: '67139051493590', compteDest: "791045132", montant: "100", dateOperation: "12 Mars 2020", statut: "VALID" },
  ]
  ngOnInit() {
  }

}
