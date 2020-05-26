import {Component, OnInit} from '@angular/core';
import {Absence} from '../../models/absence';
import {MatTableDataSource} from '@angular/material';
import {Select} from '@ngxs/store';
import {Observable} from 'rxjs';
import {SalariesState} from '../../states/salaries.state';

@Component({
  selector: 'app-salarie-absences',
  templateUrl: './salarie-absences.component.html',
  styleUrls: ['./salarie-absences.component.css']
})
export class SalarieAbsencesComponent implements OnInit {

  @Select(SalariesState.getSelectedSalarieAbsences)
  absences: Observable<Absence[]>;
  absencesDs: MatTableDataSource<Absence>;
  absenceCols: string[] = ['datedebut', 'datefin', 'type', 'justificatif'];


  constructor() {
  }

  ngOnInit() {
    this.absences.subscribe(data => {
      this.absencesDs = new MatTableDataSource<Absence>(data);
      this.absencesDs.filterPredicate = (data: any, filter) => {
        const dataStr = JSON.stringify(data).toLowerCase();
        return dataStr.indexOf(filter) !== -1;
      };

    });

  }

  search($event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.absencesDs.filter = filterValue.trim().toLowerCase();
  }

}
