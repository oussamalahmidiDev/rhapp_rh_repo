import {Component, OnInit, Injectable, ViewChild} from '@angular/core';
import {MatSnackBar, MatDialog, MatTableDataSource, MatSort} from '@angular/material';
import { Poste } from 'src/app/models/poste';
import {PosteFormComponent} from '../forms/conge-form/conge-form.component';
import {Salarie} from '../../models/salarie';
import {SalariesService} from '../../services/salaries.service';


@Injectable()
@Component({
  selector: 'app-postes',
  templateUrl: './postes.component.html',
  styleUrls: ['./postes.component.css']
})
export class PostesComponent implements OnInit {

  salarie: Salarie = this.salariesService.getSalarie('U73540990');

  // postes: Poste[];
  postes = [
    { nom: 'Gestion de RH', direction: "Direction X", division: "Div X", service: "Service RH", competences: ["Cmp 1", "Comp2"], salarie: this.salarie },
    { nom: 'Gestion de achats', direction: "Direction X", division: "Div X", service: "Service RH", competences: ["Cmp 1", "Comp2"], salarie: undefined },
    { nom: "Gestion de RH", direction: "Direction X", division: "Div X", service: "Service RH", competences: ["Cmp 1", "Comp2"], salarie: this.salarie },
  ]
  postesDs: MatTableDataSource<Poste>;
  posteCols: string[] = ['nom', 'direction', 'division', 'service', 'competences', 'salarie'];

  // @ts-ignore
  @ViewChild(MatSort, {static: true}) sort: MatSort;

  constructor(private _snackBar: MatSnackBar, private dialog: MatDialog, private salariesService: SalariesService) {
    this.postesDs = new MatTableDataSource(this.postes);

    this.postesDs.filterPredicate = (data: any, filter) => {
      const dataStr = JSON.stringify(data).toLowerCase();
      return dataStr.indexOf(filter) != -1;
    };
   }
  // dataSource: MatTableDataSource < Element[] > ;
  ngOnInit() {
    // this.
    // this.
    // this.postesDs.data = this.postes;
    this.postesDs.sort = this.sort;
  }

  openSnackBar() {
    this._snackBar.open("Virements ajouté", "OK", {
      duration: 2000,
    });
  }

  openVirementForm(): void {
    const dialogRef = this.dialog.open(PosteFormComponent, {
      width: '500px',
     // data: this.mesVirements
      // virement: this.newVirement
    })

  };


  search($event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.postesDs.filter = filterValue.trim().toLowerCase();
  }
}
