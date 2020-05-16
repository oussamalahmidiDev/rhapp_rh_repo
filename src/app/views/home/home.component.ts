import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {UserService} from 'src/app/services/user.service';
import {User} from 'src/app/models/user';
import {ActivatedRoute, NavigationCancel, NavigationEnd, NavigationError, NavigationStart, Router, RouterEvent} from '@angular/router';
import {MatDialog, MatSnackBar} from '@angular/material';
import {ProfileModalComponent} from 'src/app/components/forms/profile-modal/profile-modal.component';
import {Salarie} from 'src/app/models/salarie';
import {SalariesService} from 'src/app/services/salaries.service';
import {fromEvent} from 'rxjs';
import {debounceTime, distinctUntilChanged, filter, tap} from 'rxjs/operators';
import {SearchResultsComponent} from 'src/app/components/search-results/search-results.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  currentUser: User;

  searchResults: Salarie[];
  searchQuery: string;

  loading: boolean = true;

  @ViewChild('searchField') input: ElementRef;

  constructor(
    private userService: UserService,
    public router: Router,
    private dialog: MatDialog,
    private salariesService: SalariesService,
    private _snackBar: MatSnackBar,
    private activatedRoute: ActivatedRoute,
  ) {
    // this.router.routeReuseStrategy.shouldReuseRoute = function () {
    //   return false;
    // };
    router.events.subscribe((routerEvent: RouterEvent) => {
      this.checkRouterEvent(routerEvent);
    });
  }

  ngOnInit() {
    this.searchQuery = null;
    this.currentUser = this.activatedRoute.snapshot.data.profile;
  }

  checkRouterEvent(routerEvent: RouterEvent): void {
    if (routerEvent instanceof NavigationStart) {
      this.loading = true;
    }

    if (routerEvent instanceof NavigationEnd ||
      routerEvent instanceof NavigationCancel ||
      routerEvent instanceof NavigationError) {
      this.loading = false;
    }
  }

  ngAfterViewInit() {
    fromEvent(this.input.nativeElement, 'keyup')
      .pipe(
        filter(Boolean),
        debounceTime(300),
        distinctUntilChanged(),
        tap((text) => {
          console.log(this.input.nativeElement.value);
          this.onSearchQueryChange(this.input.nativeElement.value);
        })
      )
      .subscribe();
  }

  onSearchQueryChange(query) {
    this.searchResults = [];
    console.log('CURRENT SEACH RESULT', this.searchResults, 'QUERY', query);
    if (query !== '' && query !== null && query !== undefined) {
      console.log('SEARCHING ..', query);
      this.salariesService.searchSalaries(query).subscribe(
        data => data.length > 0 ? this.searchResults = data : this.openSnackBar('Aucun salarié trouvé ...')
      );
    }
    // console.log("SEARCHED SALARIE", salarie);
  }

  openSnackBar(message: string) {
    this._snackBar.open(message, 'OK', {
      duration: 2000,
    });
  }

  showSalarieNom(salarie: Salarie) {
    let k = salarie ? salarie.nom + ' ' + salarie.prenom : salarie;
    return k;
  }

  redirect(id) {
    this.searchResults = [];
    this.input.nativeElement.value = null;
    console.log('redirecting to .. ', id);
    this.router.navigateByUrl('/home').then(() => this.router.navigate(['/home/salaries', id])).catch(err => console.log(err));
    // this.router.navigate(['/home/salaries',id]).catch(err => console.log(err));
  }

  logout(): void {
    this.userService.logout();
  }

  openSearchResults(results) {
    this.dialog.open(SearchResultsComponent, {
      data: results,
      width: '550px',
      hasBackdrop: false,
      autoFocus: false,
      restoreFocus: true,
      position: {top: '60px', left: '121.56666564941406px'}
    });
  }

  openProfileModal() {
    const dialogRef = this.dialog.open(ProfileModalComponent, {
      data: this.currentUser,
      disableClose: true,
      width: '500px',
      position: {top: '15px', right: '10px'}
    });
    dialogRef.afterClosed().subscribe(
      data => {
        if (data !== undefined) {
          this.currentUser = data;
        }
      }
    )
  }

}
