import { Component, OnInit } from '@angular/core';
import {Salarie} from '../../models/salarie';
import {SalariesService} from '../../services/salaries.service';
import {ActivatedRoute} from '@angular/router';
import {Location} from '@angular/common';

@Component({
  selector: 'app-salarie',
  templateUrl: './salarie.component.html',
  styleUrls: ['./salarie.component.css']
})
export class SalarieComponent implements OnInit {

  id: number;
  salarie: Salarie;
  salarieLoaded = true;


  constructor(private salariesService: SalariesService, private route: ActivatedRoute, private location: Location) {

  }

  ngOnInit() {
    this.salarie =  this.route.snapshot.data.salarie;
    // this.id = parseInt(this.route.snapshot.paramMap.get('id'));
    // console.log("SAL ID = ", this.id, this.route.snapshot.paramMap.get('id'));
    // // this.salarie = null;
    // this.salariesService.getSalarie(this.id).subscribe(
    //   data => {
    //     this.salarie = data;
    //     this.salarieLoaded = true;
    //   },
    //   error => {
    //     this.salarieLoaded = true;
    //     alert("error loading page");
    //   }
    // );
  }

  goBack() {
    this.location.back();
  }
}
