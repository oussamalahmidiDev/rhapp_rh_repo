import {Component, OnInit, Injectable, ViewChild} from '@angular/core';
import {MatSnackBar, MatDialog, MatTableDataSource, MatSort} from '@angular/material';
import {Conge} from 'src/app/models/conge';
import {CongeReponseFormComponent} from '../forms/conge-reponse-form/conge-reponse-form.component';
import {CongeFormComponent} from '../forms/conge-form/conge-form.component';
import {Salarie} from '../../models/salarie';
import {SalariesService} from '../../services/salaries.service';
import {CongesService} from '../../services/conges.service';



@Injectable()
@Component({
  selector: 'app-conges',
  templateUrl: './conges.component.html',
  styleUrls: ['./conges.component.css']
})
export class CongesComponent implements OnInit {

  conges: Conge[];
  congesDs: MatTableDataSource<Conge>;
  congeCols: string[] = ['salarie', 'motif', 'type', 'datedebut', 'datefin', 'etat', 'actions'];

  // @ts-ignore
  @ViewChild(MatSort, {static: true}) sort: MatSort;

  constructor(private congesService:CongesService , private _snackBar: MatSnackBar, private dialog: MatDialog, private salariesService: SalariesService) {
    this.congesDs = new MatTableDataSource<Conge>();
    this.congesDs.filterPredicate = (data: any, filter) => {
      const dataStr = JSON.stringify(data).toLowerCase();
      return dataStr.indexOf(filter) !== -1;
    };

  }

  // dataSource: MatTableDataSource < Element[] > ;
  ngOnInit() {

    this.getConges();
  
  }

  openSnackBar() {
    this._snackBar.open('Virements ajouté', 'OK', {
      duration: 2000,
    });
  }

  openCongeReponseForm(conge: Conge): void {
    console.log('CONG', conge);
    this.dialog.open(CongeReponseFormComponent, {
      width: '460px',
      data: conge
    });
  }

  openVirementForm(): void {
    this.dialog.open(CongeFormComponent, {
      width: '500px',
      // data: this.mesVirements
      // virement: this.newVirement
    });

  };

  search($event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.congesDs.filter = filterValue.trim().toLowerCase();
  }

  getConges(){
    this.congesService.getConges().subscribe(data=>{
      // @ts-ignore
      this.conges = data;
      this.congesDs.data= this.conges;
      console.log(data);
    },error => {
      console.log(error);
    })
  }


}
