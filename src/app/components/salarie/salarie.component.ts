import { Component, OnInit } from '@angular/core';
import {Salarie} from '../../models/salarie';
import {SalariesService} from '../../services/salaries.service';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-salarie',
  templateUrl: './salarie.component.html',
  styleUrls: ['./salarie.component.css']
})
export class SalarieComponent implements OnInit {

  id: string;
  salarie: Salarie;


  constructor(private salariesService: SalariesService, private route: ActivatedRoute) {

  }

  ngOnInit() {
    this.salarie = this.salariesService.getSalarie(this.route.snapshot.paramMap.get('id'));
    console.log("HOME", this.salarie);
  }

}
