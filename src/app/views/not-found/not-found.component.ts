import {Component, OnInit} from '@angular/core';
import {Observable} from 'rxjs';
import {User} from '../../models/user';
import {Select, Store} from '@ngxs/store';
import {ProfileState} from '../../states/profile.state';
import {GetProfile} from '../../actions/profile.action';

@Component({
  selector: 'app-not-found',
  templateUrl: './not-found.component.html',
  styleUrls: ['./not-found.component.css']
})
export class NotFoundComponent implements OnInit {

  @Select(ProfileState.getProfile)
  currentUser: Observable<User>;

  constructor(private store: Store) {
  }

  ngOnInit() {
    this.store.dispatch(new GetProfile());
  }

}
