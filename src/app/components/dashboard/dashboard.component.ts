import {Component, OnInit} from '@angular/core';
import {Select} from '@ngxs/store';
import {ProfileState} from '../../states/profile.state';
import {Observable} from 'rxjs';
import {User} from '../../models/user';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  @Select(ProfileState.getProfile)
  profile: Observable<User>;


  constructor() {
  }


  ngOnInit() {
  }

}
