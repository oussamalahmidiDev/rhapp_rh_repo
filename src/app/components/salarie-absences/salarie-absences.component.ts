import { Component, OnInit } from '@angular/core';
import { Absence } from 'src/app/models/absence';
import { MatTableDataSource } from '@angular/material';
import { SalariesService } from 'src/app/services/salaries.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-salarie-absences',
  templateUrl: './salarie-absences.component.html',
  styleUrls: ['./salarie-absences.component.css']
})
export class SalarieAbsencesComponent implements OnInit {

  absences: Absence[];
  absencesDs: MatTableDataSource<Absence>;
  absenceCols: string[] = ['datedebut', 'datefin', 'type', 'justificatif'];

  id = parseInt(this.route.parent.snapshot.paramMap.get('id'));
  
  constructor(
    private salariesService: SalariesService,
    private route: ActivatedRoute

  ) {
    this.absencesDs = new MatTableDataSource<Absence>();

    this.absencesDs.filterPredicate = (data: any, filter) => {
      const dataStr = JSON.stringify(data).toLowerCase();
      return dataStr.indexOf(filter) !== -1;
    };
   }

  ngOnInit() {
    this.salariesService.getSalarieAbsences(this.id).subscribe(
      data => this.absencesDs.data = this.absences = data
    );
  }

  search($event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.absencesDs.filter = filterValue.trim().toLowerCase();
  }

}
