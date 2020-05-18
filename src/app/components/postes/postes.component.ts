import {Component, Injectable, OnInit, ViewChild} from '@angular/core';
import {MatDialog, MatSnackBar, MatSort, MatTableDataSource} from '@angular/material';
import {Poste} from '../../models/poste';
import {PosteFormComponent} from '../forms/poste-form/poste-form.component';
import {PosteService} from '../../services/poste.service';
import { PosteAffectationFormComponent } from '../forms/poste-affectation-form/poste-affectation-form.component';
import { ActivatedRoute } from '@angular/router';


@Injectable()
@Component({
  selector: 'app-postes',
  templateUrl: './postes.component.html',
  styleUrls: ['./postes.component.css']
})
export class PostesComponent implements OnInit {

  // salarie: Salarie = this.salariesService.getSalarie('U73540990');

  postes: Poste[] = [];
  postesDs: MatTableDataSource<Poste>;
  posteCols: string[] = ['nom', 'direction', 'division', 'service', 'competences', 'salarie'];

  // @ts-ignore
  @ViewChild(MatSort, {static: true}) sort: MatSort;

  constructor(
    private service: PosteService,
    private dialog: MatDialog,
    private _snackBar: MatSnackBar,
    private activatedRoute: ActivatedRoute) {
    this.postesDs = new MatTableDataSource<Poste>();

    this.postesDs.filterPredicate = (data: any, filter) => {
      const dataStr = JSON.stringify(data).toLowerCase();
      return dataStr.indexOf(filter) !== -1;
    };
  }

  // dataSource: MatTableDataSource < Element[] > ;
  ngOnInit() {
    console.log(this.activatedRoute.snapshot.data);
    this.postesDs.data = this.postes = this.activatedRoute.snapshot.data.postes;

    // this.loadPostes();
  }

  loadPostes() {
    this.activatedRoute.data.subscribe()
    console.log('LOading postes ...');
    this.service.getPostes()
      .subscribe(data => {
        console.log('Postes loaded ...');
        this.postes = data;
        this.postesDs.data = this.postes;
        this.postesDs.sort = this.sort;
      });
  }

  openSnackBar(message: string) {
    this._snackBar.open(message, 'OK', {
      duration: 2000,
    });
  }

  openPosteForm(): void {
    const dialogRef = this.dialog.open(PosteFormComponent, {
      width: '500px',

    });
    dialogRef.afterClosed().subscribe(data => {
      if (data !== undefined) {
        console.log('Subtask Dialog output:', data);
        this.postes.unshift(data);
        this.postesDs.data = this.postes;
        this.openSnackBar("Poste ajouté");
      }
    });
  };

  openPosteAffectationForm(poste: Poste): void {
    const dialogRef = this.dialog.open(PosteAffectationFormComponent, {
      width: '500px',
      data: poste
    });
    dialogRef.afterClosed().subscribe(data => {
      if (data !== undefined) {
        console.log('Subtask Dialog output:', data);
        this.postes = this.postes.map(poste => {
          if (poste.salarie && poste.id !== data.id) {
            if (poste.salarie.id === data.salarie.id) {
              poste.salarie = null;
            }
          } else if (poste.id === data.id)
            poste = data;

          return poste;
        });
        this.postesDs.data = this.postes;
        this.openSnackBar(`Le salarié ${data.salarie.nom} a été affecté au poste ${data.nom}`);
      }
    });
  }

  deleteSelectedSalarie(poste: Poste) {
    if (confirm(`Voulez vous désaffecter le salarié ${poste.salarie.nom} du poste de ${poste.nom} ?`)) {
      this.service.deleteSalarie(poste.id)
      .subscribe(
        data => {

          this.postes = this.postes.map(poste => poste.id === data.id ? poste = data : poste);
          this.postesDs.data = this.postes;
          this.openSnackBar(`Le salarié ${data.salarie.nom} a été désaffecté du poste ${data.nom}`);
        }
      )
    }
  }
  //
  //
  search($event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.postesDs.filter = filterValue.trim().toLowerCase();
  }
}
