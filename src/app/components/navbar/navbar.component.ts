import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {Select, Store} from '@ngxs/store';
import {ProfileState} from 'src/app/states/profile.state';
import {fromEvent, Observable} from 'rxjs';
import {User} from 'src/app/models/user';
import {Salarie} from 'src/app/models/salarie';
import {TokenService} from 'src/app/services/token.service';
import {Router} from '@angular/router';
import {MatDialog, MatSnackBar} from '@angular/material';
import {debounceTime, distinctUntilChanged, filter, tap} from 'rxjs/operators';
import {SalariesService} from 'src/app/services/salaries.service';
import {SearchResultsComponent} from '../search-results/search-results.component';
import {ProfileModalComponent} from '../forms/profile-modal/profile-modal.component';
import {UnsetProfile} from 'src/app/actions/profile.action';
import {CacheService} from 'src/app/services/cache.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  @Select(ProfileState.getProfile)
  currentUser: Observable<User>;


  searchResults: Salarie[];
  searchQuery: string;


  @ViewChild('searchField') input: ElementRef;


  constructor(
    private tokenService: TokenService,
    public router: Router,
    private dialog: MatDialog,
    private snackBar: MatSnackBar,
    private salariesService: SalariesService,
    private store: Store,
    private cache: CacheService
  ) {
  }

  ngOnInit() {
    this.searchQuery = null;
    // this.store.dispatch(new LoadProfilePhoto());
  }

  logout() {
    this.tokenService.unsetToken();
    this.cache.wipe();
    this.store.dispatch(new UnsetProfile());
    this.router.navigateByUrl('/');
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
  }

  openSnackBar(message: string) {
    this.snackBar.open(message, 'OK', {
      duration: 2000,
    });
  }

  showSalarieNom(salarie: Salarie) {
    return salarie ? salarie.nom + ' ' + salarie.prenom : salarie;
  }

  redirect(id) {
    this.searchResults = [];
    this.input.nativeElement.value = null;
    console.log('redirecting to .. ', id);
    this.router.navigateByUrl('/home').then(() => this.router.navigate(['/home/salaries', id])).catch(err => console.log(err));
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
      disableClose: true,
      width: '500px',
      position: {top: '15px', right: '10px'}
    });
  }


}
