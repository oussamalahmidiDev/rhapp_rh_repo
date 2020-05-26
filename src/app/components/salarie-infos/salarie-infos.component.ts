import {Component, OnInit} from '@angular/core';
import {Salarie} from '../../models/salarie';
import {Select} from '@ngxs/store';
import {Observable} from 'rxjs';
import {SalariesState} from '../../states/salaries.state';


@Component({
  selector: 'app-salarie-infos',
  templateUrl: './salarie-infos.component.html',
  styleUrls: ['./salarie-infos.component.css']
})
export class SalarieInfosComponent implements OnInit {

  id: number;

  @Select(SalariesState.getSelectedSalarie)
  salarie: Observable<Salarie>;
  salarieLoaded: boolean;

  constructor() {
  }

  ngOnInit() {
    this.salarieLoaded = true;

  }
}
