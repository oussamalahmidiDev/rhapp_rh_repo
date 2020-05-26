import {Component, Injectable, OnInit, ViewChild} from '@angular/core';
import {MatDialog, MatSnackBar, MatSort, MatTableDataSource} from '@angular/material';
import {Poste} from '../../models/poste';
import {PosteFormComponent} from '../forms/poste-form/poste-form.component';
import {PosteAffectationFormComponent} from '../forms/poste-affectation-form/poste-affectation-form.component';
import {ActivatedRoute} from '@angular/router';
import {Select, Store} from '@ngxs/store';
import {PostesState} from '../../states/postes.state';
import {Observable} from 'rxjs';
import {GetSalaries} from 'src/app/actions/salaries.action';
import {GetServices} from 'src/app/actions/services.action';
import {DeletePosteSalarie, GetPostes} from 'src/app/actions/postes.action';
import {GetDirections} from 'src/app/actions/directions.action';


@Injectable()
@Component({
  selector: 'app-postes',
  templateUrl: './postes.component.html',
  styleUrls: ['./postes.component.css']
})
export class PostesComponent implements OnInit {

  @Select(PostesState.getPostes)
  postes: Observable<Poste[]>;
  postesDs: MatTableDataSource<Poste>;
  posteCols: string[] = ['nom', 'direction', 'division', 'service', 'competences', 'salarie'];

  // @ts-ignore
  @ViewChild(MatSort, {static: true}) sort: MatSort;

  constructor(
    private store: Store,
    private dialog: MatDialog,
    private snackBar: MatSnackBar,
    private activatedRoute: ActivatedRoute) {
  }

  ngOnInit() {
    this.postes.subscribe(data => {
      this.postesDs = new MatTableDataSource<Poste>(data);
    });
    this.store.dispatch(new GetPostes()).subscribe(
      () => {
        this.store.dispatch(new GetSalaries());
        this.store.dispatch(new GetServices());
        this.store.dispatch(new GetDirections());
      }
    );
  }

  openSnackBar(message: string) {
    this.snackBar.open(message, 'OK', {
      duration: 2000,
    });
  }

  openPosteForm(): void {
    const dialogRef = this.dialog.open(PosteFormComponent, {
      width: '500px',

    });
    // dialogRef.afterClosed().subscribe(data => {
    //   if (data !== undefined) {
    //     console.log('Subtask Dialog output:', data);
    //     // this.postes.unshift(data);
    //     // this.postesDs.data = this.postes;
    //     // this.openSnackBar("Poste ajouté");
    //   }
    // });
  }

  openPosteAffectationForm(poste: Poste): void {
    const dialogRef = this.dialog.open(PosteAffectationFormComponent, {
      width: '500px',
      data: poste
    });
    // dialogRef.afterClosed().subscribe(data => {
    // if (data !== undefined) {
    //   console.log('Subtask Dialog output:', data);
    //   this.postes = this.postes.map(poste => {
    //     if (poste.salarie && poste.id !== data.id) {
    //       if (poste.salarie.id === data.salarie.id) {
    //         poste.salarie = null;
    //       }
    //     } else if (poste.id === data.id)
    //       poste = data;
    //
    //     return poste;
    //   });
    //   this.postesDs.data = this.postes;
    //   this.openSnackBar(`Le salarié ${data.salarie.nom} a été affecté au poste ${data.nom}`);
    // }
    // });
  }

  deleteSelectedSalarie(poste: Poste) {
    if (confirm(`Voulez vous désaffecter le salarié ${poste.salarie.nom} du poste de ${poste.nom} ?`)) {
      this.store.dispatch(new DeletePosteSalarie(poste.id));
    }
  }

  //
  //
  search($event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.postesDs.filter = filterValue.trim().toLowerCase();
  }
}
