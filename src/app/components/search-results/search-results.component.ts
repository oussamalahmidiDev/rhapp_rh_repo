import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { Salarie } from '../../models/salarie';

@Component({
  selector: 'app-search-results',
  templateUrl: './search-results.component.html',
  styleUrls: ['./search-results.component.css']
})
export class SearchResultsComponent implements OnInit {


  constructor(
    @Inject(MAT_DIALOG_DATA) public data: Salarie[],
    public dialogRef: MatDialogRef<SearchResultsComponent>,
  ) { }

  ngOnInit() {
  }

}
