import { Component, OnInit } from '@angular/core';
import {Salarie} from '../../models/salarie';
import {SalariesService} from '../../services/salaries.service';
import {ActivatedRoute, ParamMap, Router} from '@angular/router';
import {map, switchMap} from 'rxjs/operators';
import {Observable} from 'rxjs';

@Component({
  selector: 'app-salarie-infos',
  templateUrl: './salarie-infos.component.html',
  styleUrls: ['./salarie-infos.component.css']
})
export class SalarieInfosComponent implements OnInit {

  id: string;
  salarie: Salarie;

  constructor(private salariesService: SalariesService, private route: ActivatedRoute) {}

  ngOnInit() {
    this.salarie = this.salariesService.getSalarie(this.route.parent.snapshot.paramMap.get('id'));
  }
}
