import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {User} from '../../models/user';
import {Router} from '@angular/router';
import {Observable} from 'rxjs';
import {Select, Store} from '@ngxs/store';
import {ProfileState} from 'src/app/states/profile.state';
import {AppState} from 'src/app/states/app.state';
import { GetNotifications } from 'src/app/actions/notifications.action';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  @Select(ProfileState.getProfile)
  profile: Observable<User>;


  @Select(AppState.getFetchingState)
  loading: Observable<boolean>;

  @ViewChild('searchField') input: ElementRef;

  constructor(
    public router: Router,
    public store: Store
  ) {

  }

  ngOnInit() {
    // this.store.dispatch(new GetNotifications());
  }

}
