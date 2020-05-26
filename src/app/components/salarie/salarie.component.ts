import {Component, OnInit} from '@angular/core';
import {Salarie} from '../../models/salarie';
import {SalariesService} from '../../services/salaries.service';
import {ActivatedRoute} from '@angular/router';
import {Location} from '@angular/common';
import {Select, Store} from '@ngxs/store';
import {Observable} from 'rxjs';
import {DeleteSalariePoste} from 'src/app/actions/salaries.action';
import {SalariesState} from '../../states/salaries.state';

@Component({
  selector: 'app-salarie',
  templateUrl: './salarie.component.html',
  styleUrls: ['./salarie.component.css']
})
export class SalarieComponent implements OnInit {

  id: number;
  @Select(SalariesState.getSelectedSalarie)
  salarie: Observable<Salarie>;
  salarieLoaded = true;


  constructor(
    private salariesService: SalariesService,
    private route: ActivatedRoute,
    private store: Store,
    private location: Location) {
  }

  ngOnInit() {
  }

  deletePoste() {
    this.store.dispatch(new DeleteSalariePoste());
  }

  goBack() {
    this.location.back();
  }
}
