import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { User } from 'src/app/models/user';
import {Router} from '@angular/router';
import { MatDialog } from '@angular/material';
import { ProfileModalComponent } from 'src/app/components/forms/profile-modal/profile-modal.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  currentUser: User;

  ngOnInit() {
    // this.currentUser = this.userService.currentUser;
  }

  logout() : void {
    this.userService.logout();
  }

  constructor(private userService: UserService, private router: Router, private dialog: MatDialog ) {}

  openProfileModal () {
    const dialogRef = this.dialog.open(ProfileModalComponent, {
      disableClose: true,
      width: '500px',
      position: { top: '15px', right: '10px' }
    });
  }

}
