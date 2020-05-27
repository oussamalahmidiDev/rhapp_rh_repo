import {Component, Injectable, OnInit, ViewChild} from '@angular/core';
import {MatSort, MatTableDataSource} from '@angular/material';
import {Activity} from '../../models/activity';
import {Select, Store} from '@ngxs/store';
import {JournalState} from '../../states/evenements.state';
import {Observable} from 'rxjs';
import {GetEvenements} from '../../actions/evenements.action';
import {User} from '../../models/user';
import {ProfileState} from '../../states/profile.state';


@Injectable()
@Component({
  selector: 'app-journal',
  templateUrl: './journal.component.html',
  styleUrls: ['./journal.component.css']
})
export class JournalComponent implements OnInit {


  @Select(JournalState.getEvenements)
  activities: Observable<Activity[]>;

  @Select(ProfileState.getProfile)
  currentUser: Observable<User>;

  limit = 50;

  activitiesDs: MatTableDataSource<Activity>;
  activityCols: string[] = ['evenement', 'service', 'timestamp', 'user'];

  // @ts-ignore
  @ViewChild(MatSort, {static: true}) sort: MatSort;

  constructor(private store: Store) {
  }

  // dataSource: MatTableDataSource < Element[] > ;
  ngOnInit() {
    this.activities.subscribe(
      data => {
        this.activitiesDs = new MatTableDataSource(data);
        this.activitiesDs.filterPredicate = (data: any, filter) => {
          const dataStr = JSON.stringify(data).toLowerCase();
          return dataStr.indexOf(filter) !== -1;
        };
        this.activitiesDs.sortingDataAccessor = (item, property) => {
          switch (property) {
            case 'timestamp':
              return new Date(item.timestamp);
            default:
              return item[property];
          }
        };
      }
    );
    this.store.dispatch(new GetEvenements(this.limit));
  }

  search($event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.activitiesDs.filter = filterValue.trim().toLowerCase();
  }

  onScroll(e) {
    // this.limit += 10;
    const tableViewHeight = e.target.offsetHeight; // viewport: ~500px
    const tableScrollHeight = e.target.scrollHeight; // length of all table
    const scrollLocation = e.target.scrollTop; // how far user scrolled

    // If the user has scrolled within 200px of the bottom, add more data
    const buffer = 200;
    const limit = tableScrollHeight - tableViewHeight - buffer;
    if (scrollLocation === tableScrollHeight - tableViewHeight) {
      this.limit += 50;
      console.log('INCREMENTING LIMIT', this.limit);
      this.store.dispatch(new GetEvenements(this.limit));
      // this.dataSource = this.dataSource.concat(ELEMENT_DATA);
    }
    console.log('scrolling', scrollLocation, tableScrollHeight - tableViewHeight, limit);
  }


}
