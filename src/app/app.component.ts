import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {Store} from '@ngxs/store';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {


  constructor(private store: Store, private router: Router) {
  }

  ngOnInit() {
    // LogRocket.init('twzdyk/rehapp');
    // const currentUser = this.store.selectSnapshot(ProfileState.getProfile);
    // if (currentUser) {
    //   LogRocket.identify(currentUser.id, {
    //     name: currentUser.nom + ' ' + currentUser.prenom,
    //     email: currentUser.email,

    //     // Add your own custom user variables here, ie:
    //     });
    // } else {
    //   LogRocket.identify("0", {
    //     name: "ANONYMOUS",
    //     email: "ANONYMOUS",

    //     // Add your own custom user variables here, ie:
    //     });
    // }

  }

  refresh() {
    // this.location.reload();
    // this.store.dispatch(new GetProfile());
    // this.router.navigateByUrl('.', { skipLocationChange: true });
  }
}
