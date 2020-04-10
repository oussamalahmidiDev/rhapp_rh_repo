import {Component, OnInit, Injectable, ViewChild} from '@angular/core';
import {MatSnackBar, MatDialog, MatTableDataSource, MatSort} from '@angular/material';
import {Poste} from 'src/app/models/poste';
import {Salarie} from '../../models/salarie';
import {SalariesService} from '../../services/salaries.service';
import {PosteFormComponent} from '../forms/poste-form/poste-form.component';
import {PosteService} from '../../services/poste.service';


@Injectable()
@Component({
  selector: 'app-postes',
  templateUrl: './postes.component.html',
  styleUrls: ['./postes.component.css']
})
export class PostesComponent implements OnInit {

  // salarie: Salarie = this.salariesService.getSalarie('U73540990');

  postes: Poste[];
  // postes =
  postesDs: MatTableDataSource<Poste>;
  posteCols: string[] = ['nom', 'direction', 'division', 'service', 'competences', 'salarie'];

  // @ts-ignore
  @ViewChild(MatSort, {static: true}) sort: MatSort;

  constructor(private _snackBar: MatSnackBar,
              private dialog: MatDialog,
              private salariesService: SalariesService,
              private posteService: PosteService
  ) {
    this.postes = this.posteService.postes;
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
    this._snackBar.open('Poste ajouté', 'OK', {
      duration: 2000,
    });
  }

  openPosteForm(): void {
    const dialogRef = this.dialog.open(PosteFormComponent, {
      width: '500px',

    });
    dialogRef.afterClosed().subscribe(data => {
      console.log('Subtask Dialog output:', data);

      this.postesDs.data = this.postes;
      this.openSnackBar();
    });

  };


  search($event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.postesDs.filter = filterValue.trim().toLowerCase();
  }
}
