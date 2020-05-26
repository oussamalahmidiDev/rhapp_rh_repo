import {Component, Injectable, OnInit, ViewChild} from '@angular/core';
import {MatDialog, MatSnackBar, MatSort} from '@angular/material';
import {Retraite} from '../../models/retraite';
import {RetraiteFormComponent} from '../forms/retraite-form/retraite-form.component';
import {Salarie} from '../../models/salarie';
import {SalariesService} from '../../services/salaries.service';
import {ActivatedRoute} from '@angular/router';
import {RetraitesService} from '../../services/retraites.service';
import {AvantageRejetFormComponent} from '../forms/avantage-rejet-form/avantage-rejet-form.component';
import {Select, Store} from '@ngxs/store';
import {Observable} from 'rxjs';
import {ValiderRetraite} from 'src/app/actions/salaries.action';
import {SalariesState} from '../../states/salaries.state';


@Injectable()
@Component({
  selector: 'app-salarie-retraite',
  templateUrl: './salarie-retraite.component.html',
  styleUrls: ['./salarie-retraite.component.css']
})
export class SalarieRetraiteComponent implements OnInit {

  id: number;

  @Select(SalariesState.getSelectedSalarieRetraite)
  retraite: Observable<Retraite>;

  salarieLoaded: boolean;

  @Select(SalariesState.getSelectedSalarie)
  salarie: Observable<Salarie>;

  // @ts-ignore
  @ViewChild(MatSort, {static: true}) sort: MatSort;

  constructor(
    private snackBar: MatSnackBar,
    private dialog: MatDialog,
    private salariesService: SalariesService,
    private retraitesService: RetraitesService,
    private route: ActivatedRoute,
    private store: Store
  ) {
  }

  ngOnInit() {
    this.salarieLoaded = true;

  }

  openSnackBar() {
    this.snackBar.open('Virements ajouté', 'OK', {
      duration: 2000,
    });
  }

  openRetraiteFrom(): void {
    const dialogRef = this.dialog.open(RetraiteFormComponent, {
      width: '500px',
    });
    dialogRef.afterClosed().subscribe(
      (data: Retraite) => {
        if (data !== undefined) {
          // console.log("SAVED RETRAITE", data);
          // this.retraite = this.salarie.retraite = data;
          // this.salariesService.emit(this.salarie);
        }
      }
    );
  }

  search($event) {
    const filterValue = (event.target as HTMLInputElement).value;
  }


  retirerAvantages() {
    const dialogRef = this.dialog.open(AvantageRejetFormComponent, {
      width: '500px',
      // data: this.salarie
    });
    dialogRef.afterClosed().subscribe(
      data => {
        // if (data !== undefined) {
        //   this.salarie = data;
        //   this.retraite = this.salarie.retraite;
        // }
      }
    );
  }

  validerRetraite() {
    const salarieSnapshot = this.store.selectSnapshot(SalariesState.getSelectedSalarie);
    if (confirm(`Vous êtes sûr que vous voulez valider la retraite de ${salarieSnapshot.nom} ${salarieSnapshot.prenom} ?`)) {
      this.store.dispatch(new ValiderRetraite());
    }
  }
}
