import {Component, Injectable, OnInit, ViewChild} from '@angular/core';
import {MatSort, MatTableDataSource} from '@angular/material';
import {Activity} from '../../models/activity';
import {Select, Store} from '@ngxs/store';
import {JournalState} from '../../states/evenements.state';
import {Observable, interval, Subscription} from 'rxjs';
import {GetEvenements} from '../../actions/evenements.action';
import {User} from '../../models/user';
import {ProfileState} from '../../states/profile.state';
import { startWith, switchMap } from 'rxjs/operators';


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

  subscription: Subscription;

  limit = 50;

  activitiesDs: MatTableDataSource<Activity>;
  activityCols: string[] = ['evenement', 'service', 'timestamp', 'user'];

  // @ts-ignore
  @ViewChild(MatSort) sort: MatSort;

  constructor(private store: Store) {
    this.subscription = new Subscription();
  }

  // dataSource: MatTableDataSource < Element[] > ;
  ngOnInit() {
    this.activities.subscribe(
      data => {
        this.activitiesDs = new MatTableDataSource(data);
        this.activitiesDs.filterPredicate = (data: any, filter) => {
          // console.log(data.user, filter);
          // return data.user.nom == filter;
          const dataStr = JSON.stringify(data).toLowerCase();
          console.log(dataStr, filter, dataStr.indexOf(filter));
          return dataStr.indexOf(filter) !== -1;
        };
        // this.activitiesDs.sortingDataAccessor = (item, property) => {
        //   switch (property) {
        //     case 'timestamp':
        //       return new Date(item.timestamp);
        //     default:
        //       return item[property];
        //   }
        // };
      }
    );
    this.subscription.add(
      interval(5000)
    .pipe(
      startWith(0),
      switchMap(() =>{ return this.store.dispatch(new GetEvenements(this.limit));})
    ).subscribe(res => {})
    );
    // interval(5000)
    // .pipe(
    //   startWith(0),
    //   switchMap(() =>{console.log('fetching...'); return this.store.dispatch(new GetEvenements(this.limit));})
    // ).subscribe(res => console.log('fetching...'));
    // this.store.dispatch(new GetEvenements(this.limit));
  }

  search($event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.activitiesDs.filter = filterValue.trim().toLowerCase();
  }

  ngOnDestroy() {
    console.log('destroying...');
    this.subscription.unsubscribe();
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
      // console.log('INCREMENTING LIMIT', this.limit);
      this.store.dispatch(new GetEvenements(this.limit));
      // this.dataSource = this.dataSource.concat(ELEMENT_DATA);
    }
    // console.log('scrolling', scrollLocation, tableScrollHeight - tableViewHeight, limit);
  }


}
