import {Component, Injectable, OnInit, ViewChild} from '@angular/core';
import {MatDialog, MatSnackBar, MatSort} from '@angular/material';
import {Retraite} from '../../models/retraite';
import {RetraiteFormComponent} from '../forms/retraite-form/retraite-form.component';
import {Salarie} from '../../models/salarie';
import {SalariesService} from '../../services/salaries.service';
import {ActivatedRoute} from '@angular/router';
import {RetraitesService} from '../../services/retraites.service';
import {AvantageRejetFormComponent} from '../forms/avantage-rejet-form/avantage-rejet-form.component';


@Injectable()
@Component({
  selector: 'app-salarie-retraite',
  templateUrl: './salarie-retraite.component.html',
  styleUrls: ['./salarie-retraite.component.css']
})
export class SalarieRetraiteComponent implements OnInit {

  id: number;

  retraite: Retraite;
  // retraitesDs: MatTableDataSource<Retraite>;
  // retraiteCols: string[] = ['salarie', 'date', 'type', 'ref', 'etat'];

  salarieLoaded: boolean;

  salarie: Salarie;

  // @ts-ignore
  @ViewChild(MatSort, {static: true}) sort: MatSort;

  constructor(
    private _snackBar: MatSnackBar,
    private dialog: MatDialog,
    private salariesService: SalariesService,
    private retraitesService: RetraitesService,
    private route: ActivatedRoute
  ) {
  }

  ngOnInit() {
    this.salarieLoaded = false;
    this.id = parseInt(this.route.parent.snapshot.paramMap.get('id'));
    this.salariesService.getSalarie(this.id).subscribe(
      data => {
        this.salarie = data;
        this.salarieLoaded = true;
        this.retraite = this.salarie.retraite;
      },
      error => {
        this.salarieLoaded = true;
        alert('error loading page');
      }
    );
  }

  openSnackBar() {
    this._snackBar.open('Virements ajouté', 'OK', {
      duration: 2000,
    });
  }

  openRetraiteFrom(): void {
    const dialogRef = this.dialog.open(RetraiteFormComponent, {
      width: '500px',
      data: {
        dateRetraite: undefined,
        reference: '',
        remarques: '',
        salarie: this.salarie,
        type: {id: undefined, typeRetraite: undefined}
      }
    });
    dialogRef.afterClosed().subscribe(
      (data: Retraite) => {
        if (data !== undefined) {
          console.log("SAVED RETRAITE", data);
          this.retraite = this.salarie.retraite = data;
          this.salariesService.emit(this.salarie);
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
      data: this.salarie
    });
    dialogRef.afterClosed().subscribe(
      data => {
        if (data !== undefined) {
          this.salarie = data;
          this.retraite = this.salarie.retraite;
        }
      }
    );
  }

  validerRetraite() {
    if (confirm(`Vous êtes sûr que vous voulez valider la retraite de ${this.salarie.nom} ${this.salarie.prenom} ?`)) {
      this.retraitesService.validerRetraite(this.salarie.id).subscribe(
        data => {
          this.salarie.retraite = this.retraite = data;
          this.salariesService.emit(this.salarie);
        }
      );
    }
  }
}
