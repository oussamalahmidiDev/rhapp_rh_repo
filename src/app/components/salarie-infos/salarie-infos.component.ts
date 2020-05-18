import { Component, OnInit } from '@angular/core';
import {Salarie} from '../../models/salarie';
import {SalariesService} from '../../services/salaries.service';
import {ActivatedRoute, ParamMap, Router} from '@angular/router';


@Component({
  selector: 'app-salarie-infos',
  templateUrl: './salarie-infos.component.html',
  styleUrls: ['./salarie-infos.component.css']
})
export class SalarieInfosComponent implements OnInit {

  id: number;
  salarie: Salarie;
  salarieLoaded: boolean;

  constructor(private salariesService: SalariesService, private route: ActivatedRoute) {}

  ngOnInit() {
    this.salarieLoaded = false;
    this.id = parseInt(this.route.parent.snapshot.paramMap.get('id'));
    this.salariesService.getSalarie(this.id).subscribe(
      data => {
        this.salarie = data;
        this.salarieLoaded = true;
      },
      error => {
        this.salarieLoaded = true;
        alert("error loading page");
      }
    );
  }
}
